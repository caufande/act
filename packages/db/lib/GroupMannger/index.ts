/**
 * 用户组相关
 * @license AGPL-3.0-or-later
 */
declare module '.';

import CnbApi, { CnbConfig } from '../CnbApi';
import { CheckingType, getOperator, Storager } from '../Operator';
import getGroups from './getGroups';
import Groups from './Groups';

export * from './getGroups';
export * from './Groups';
export { getGroups, Groups };

export interface GroupManngerOption {
	checkingType?: CheckingType;
}
export default class GroupMannger {
	protected static keySign = 'cauact_gm';
	protected static groupsKey = `${this.keySign}_groups`;
	protected readonly cnbApi: CnbApi;
	protected readonly groupsStorager: Storager<Groups>;
	constructor(
		cnbConfig: CnbConfig,
		readonly groupsPostId: number,
		option: GroupManngerOption = {},
	) {
		const { checkingType } = option;
		const operator = getOperator();
		this.cnbApi = new CnbApi(cnbConfig);
		this.groupsStorager = new operator.storagerIniter({
			checkingType,
			asserter: Groups.assert,
			serializer: Groups.serializer,
			deserializer: Groups.deserializer,
		});
	}
	getMy() {
		1 + 1;
	}
	async add() {
		await this.update();
	}
	async update() {
		const postHtml = await this.cnbApi.getPost(this.groupsPostId);
		const groups = await getGroups(postHtml);
		this.groupsStorager.set(GroupMannger.groupsKey, groups);
	}
}
