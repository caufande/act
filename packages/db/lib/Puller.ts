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

const versionStartString = `<pre><code class="language-js">`;
const versionEndString = `</code></pre>`;
function getStorageKey(floor: number) {
	return `cauact_game_${floor}`;
}
const versionStorageKey = 'cauact_game_version';

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
	static assertVerInfo(n: unknown): asserts n is VerInfo {
		Value.Assert(VerInfo, n);
		if (!(n.diff instanceof Set)) throw Error();
	}

	protected readonly cnbApi: CnbApi;
	protected readonly commentGetter: CommentGetter;
	protected readonly storagerVerInfo: Storager<VerInfo>;
	protected readonly storagerAct: Storager<Act>;
	constructor(
		cnbConfig: CnbConfig,
		readonly postId: number,
		readonly blogApp: string,
	) {
		const operator = getOperator();
		this.cnbApi = new CnbApi(cnbConfig);
		this.commentGetter = this.cnbApi.getCommentGetter(blogApp, postId);
		this.storagerVerInfo = new operator.storagerIniter(Puller.assertVerInfo);
		this.storagerAct = new operator.storagerIniter(Act.assert);
	}

	protected async getStoragedAct(floor: number) {
		return await this.storagerAct.get(getStorageKey(floor));
	}
	protected async setStoragedAct(floor: number, act: Act) {
		return await this.storagerAct.set(getStorageKey(floor), act);
	}
	protected async getStoragedVerInfo() {
		return await this.storagerVerInfo.get(versionStorageKey);
	}
	protected async setStoragedVerInfo(verInfo: VerInfo) {
		return await this.storagerVerInfo.set(versionStorageKey, verInfo);
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
		const startIndex = post.indexOf(versionStartString) + versionStartString.length;
		const endIndex = post.indexOf(versionEndString, startIndex);
		const data = post.slice(startIndex, endIndex);
		const version = JSON.parse(data);
		Value.Assert(Version, version);
		return version;
	}
	protected async getVerInfo(): Promise<VerInfo> {
		return this.cachedVerInfo ?? await this.getStoragedVerInfo() ?? await this.update();
	}
	async update() {
		const version = await this.reqVerInfo();
		const verInfoLast = await this.getStoragedVerInfo();
		const verInfo: VerInfo = {
			version,
			diff: await this.getDiff(version, verInfoLast?.version),
		};
		this.cachedVerInfo = verInfo;
		await this.setStoragedVerInfo(verInfo);
		return verInfo;
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
			?? await this.storagerAct.get(getStorageKey(floor))
			?? await this.reqAct(floor);
	}

	async upgradeAll() {
		await Promise.allSettled(Array.from(this.cachedVerInfo?.diff ?? [])
			.map(async floor => await this.setStoragedAct(floor, await this.reqAct(floor))));
	}

	protected async getActAll(): Promise<Act[]> {
		const version = (await this.getVerInfo()).version;
		const acts = await Promise.all(range(1, version.length).map(floor => this.getAct(floor)));
		acts.unshift(void 0 as any);
		return acts;
	}
	async getAll(): Promise<Pulled> {
		return {
			verInfo: await this.getVerInfo(),
			acts: await this.getActAll(),
		};
	}
}
