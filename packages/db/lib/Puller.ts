/**
 * 网络拉取器
 * @license GPL-2.0-or-later
 */
declare module './Puller';

import CnbApi, { CnbConfig, Commit } from './CnbApi';
import { RequesterIniter } from './Requester';
import Storager from './Storager';
import type { Schema as IAct } from './schema';
import { range } from './util';

const versionStartString = `<pre><code class="language-js">`;
const versionEndString = `</code></pre>`;
function getStorageKey(floor: number) {
	return `cauact_game_${floor}`;
}
const versionStorageKey = 'cauact_game_version';

export type Version = readonly number[];
type Act = IAct;

export default class Puller {
	protected readonly cnbApi: CnbApi;
	constructor(
		requesterIniter: RequesterIniter,
		cnbConfig: CnbConfig,
		readonly postId: number,
		readonly blogApp: string,
		protected readonly storagerAct: Storager<Act>,
		protected readonly storagerVersion: Storager<Version>,
	) {
		this.cnbApi = new CnbApi(requesterIniter, cnbConfig);
	}
	async getVersion() {
		const post = await this.cnbApi.getPost(this.postId);
		const startIndex = post.indexOf(versionStartString) + versionStartString.length;
		const endIndex = post.indexOf(versionEndString, startIndex);
		const data = post.slice(startIndex, endIndex);
		const version: number[] = JSON.parse(data);
		return version;
	}
	async getDiff(versionNow: Version): Promise<Set<number>> {
		const versionLast = await this.storagerVersion.get(versionStorageKey);
		if (versionLast === null) return new Set(range(1, versionNow.length));
		if (versionNow[0] === versionLast[0]) return new Set();
		const diff = new Set<number>();
		versionNow.forEach((v, i) => {
			if (i !== 0 && versionLast[i] !== v) diff.add(i);
		});
		return diff;
	}
}
