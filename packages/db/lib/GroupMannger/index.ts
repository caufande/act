/**
 * 用户组相关
 * @license AGPL-3.0-or-later
 */
declare module '.';

import CnbApi, { CnbConfig } from '../CnbApi';

export { default as parseGroups } from './parseGroups';

export default class GroupMannger {
	protected readonly cnbApi: CnbApi;
	constructor(
		cnbConfig: CnbConfig,
		readonly groupsPostId: number,
	) {
		this.cnbApi = new CnbApi(cnbConfig);
	}
	getMy() {
		1 + 1;
	}
	async add() {
		await this.update();
	}
	async update() {
		const postBody = await this.cnbApi.getPost(this.groupsPostId);
	}
}
