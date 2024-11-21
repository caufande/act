import CnbApi from '../CnbApi';
import { getOperator } from '../Operator';
import getGroups from './getGroups';
import Groups from './Groups';
export * from './getGroups';
export * from './Groups';
export { getGroups, Groups };
export default class GroupMannger {
    groupsPostId;
    static keySign = 'cauact_gm';
    static groupsKey = `${this.keySign}_groups`;
    cnbApi;
    groupsStorager;
    constructor(cnbConfig, groupsPostId, option = {}) {
        this.groupsPostId = groupsPostId;
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
