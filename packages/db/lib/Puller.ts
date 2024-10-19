/**
 * 网络拉取器
 * @license GPL-2.0-or-later
 */
declare module './Puller';

import CnbApi, { CnbConfig } from './CnbApi';
import { getOperator, Storager } from './Operator';
import { Static, Type } from '@sinclair/typebox';
import { range } from './util';

const versionStartString = `<pre><code class="language-js">`;
const versionEndString = `</code></pre>`;
function getStorageKey(floor: number) {
	return `cauact_game_${floor}`;
}
const versionStorageKey = 'cauact_game_version';

export const Version = Type.Array(Type.Number());
export type Version = Static<typeof Version>;

export default class Puller {
	protected readonly cnbApi: CnbApi;
	protected readonly storagerVersion: Storager<typeof Version>;
	constructor(
		cnbConfig: CnbConfig,
		readonly postId: number,
		readonly blogApp: string,
	) {
		const operator = getOperator();
		this.cnbApi = new CnbApi(cnbConfig);
		this.storagerVersion = new operator.storagerIniter(Version);
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
