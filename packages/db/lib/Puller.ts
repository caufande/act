/**
 * 网络拉取器
 * @license GPL-2.0-or-later
 */
declare module './Puller';

import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import CnbApi, { CnbConfig, CommentGetter } from './CnbApi';
import { throwError } from './errors';
import { getOperator, Storager } from './Operator';
import parseComment, { Act } from './parseComment';
import { range } from './util';

export const Version = Type.Array(Type.Number());
export type Version = readonly number[];

export type Diff = Set<number>;

export const VerInfo = Type.Object({
	version: Version,
	diff: Type.Unknown(),
});
export interface VerInfo {
	readonly version: Version;
	readonly diff: Diff;
}

export interface Pulled {
	readonly verInfo: VerInfo;
	readonly acts: readonly Act[];
}

export default class Puller {
	protected static verStartStr = `<pre><code class="language-js">`;
	protected static verEndStr = `</code></pre>`;
	protected static keySign = 'cauact_game';
	protected static getKey(floor: number) {
		return `${this.keySign}_${floor}`;
	}

	protected static versionKey = `${this.keySign}_version`;

	protected readonly cnbApi: CnbApi;
	protected readonly commentGetter: CommentGetter;
	protected readonly storagerVersion: Storager<Version>;
	protected readonly storagerAct: Storager<Act>;
	constructor(
		cnbConfig: CnbConfig,
		readonly postId: number,
	) {
		const operator = getOperator();
		this.cnbApi = new CnbApi(cnbConfig);
		this.commentGetter = this.cnbApi.getCommentGetter(postId);
		this.storagerVersion = new operator.storagerIniter(n => Value.Assert(Version, n));
		this.storagerAct = new operator.storagerIniter(Act.assert, Act.deserializer);
	}

	protected async getStoragedAct(floor: number) {
		return await this.storagerAct.get(Puller.getKey(floor));
	}
	protected async setStoragedAct(floor: number, act: Act) {
		return await this.storagerAct.set(Puller.getKey(floor), act);
	}
	protected async getStoragedVersion() {
		return await this.storagerVersion.get(Puller.versionKey);
	}
	protected async setStoragedVersion(version: Version) {
		return await this.storagerVersion.set(Puller.versionKey, version);
	}

	private cachedVerInfo: VerInfo | null = null;
	private async getDiff(versionNow: Version, versionLast: Version | null = null): Promise<Diff> {
		if (versionLast === null) return new Set(range(1, versionNow.length));
		if (versionNow[0] === versionLast[0]) return new Set();
		const diff = new Set<number>();
		versionNow.forEach((version, floor) => {
			if (floor !== 0 && versionLast[floor] !== version) diff.add(floor);
		});
		return diff;
	}
	private async reqVerInfo(): Promise<Version> {
		const post = await this.cnbApi.getPost(this.postId);
		const startIndex = post.indexOf(Puller.verStartStr) + Puller.verStartStr.length;
		const endIndex = post.indexOf(Puller.verEndStr, startIndex);
		const data = post.slice(startIndex, endIndex);
		const version = JSON.parse(data);
		Value.Assert(Version, version);
		return version;
	}
	async update() {
		const version = await this.reqVerInfo();
		const versionLast = await this.getStoragedVersion();
		const verInfo: VerInfo = {
			version,
			diff: await this.getDiff(version, versionLast),
		};
		this.cachedVerInfo = verInfo;
		await this.setStoragedVersion(verInfo.version);
		return verInfo;
	}
	private async getStoragedVerInfo(): Promise<VerInfo | null> {
		const version = await this.getStoragedVersion();
		if (version === null) return null;
		return { version, diff: new Set() };
	}
	protected async getVerInfo(): Promise<VerInfo> {
		return this.cachedVerInfo ?? await this.getStoragedVerInfo() ?? await this.update();
	}

	protected cachedAct: Act[] = [];
	protected async reqAct(floor: number) {
		const comment = await this.commentGetter.getFloor(floor) ?? throwError('NoComment', { floor });
		const act = await parseComment(comment);
		this.cachedAct[floor] = act;
		await this.setStoragedAct(floor, act);
		return act;
	}
	async getAct(floor: number): Promise<Act> {
		if (this.cachedVerInfo?.diff.has(floor)) return await this.reqAct(floor);
		return this.cachedAct[floor]
			?? await this.storagerAct.get(Puller.getKey(floor))
			?? await this.reqAct(floor);
	}

	async upgradeAll() {
		await Promise.allSettled(Array.from(this.cachedVerInfo?.diff ?? [])
			.map(async floor => await this.setStoragedAct(floor, await this.reqAct(floor))));
	}

	protected async getActAll(): Promise<Act[]> {
		const version = (await this.getVerInfo()).version;
		const acts = await Promise.all(range(1, version.length).map(floor => this.getAct(floor)));
		acts.unshift(null as any);
		return acts;
	}
	async getAll(): Promise<Pulled> {
		return {
			verInfo: await this.getVerInfo(),
			acts: await this.getActAll(),
		};
	}
}
