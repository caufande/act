/**
 * 用户组相关
 * @license AGPL-3.0-or-later
 */
declare module '.';
import CnbApi, { CnbConfig } from '../CnbApi';
import { CheckingType, Storager } from '../Operator';
import getGroups from './getGroups';
import Groups from './Groups';
export * from './getGroups';
export * from './Groups';
export { getGroups, Groups };
export interface GroupManngerOption {
    checkingType?: CheckingType;
}
export default class GroupMannger {
    readonly groupsPostId: number;
    protected static keySign: string;
    protected static groupsKey: string;
    protected readonly cnbApi: CnbApi;
    protected readonly groupsStorager: Storager<Groups>;
    constructor(cnbConfig: CnbConfig, groupsPostId: number, option?: GroupManngerOption);
    getMy(): void;
    add(): Promise<void>;
    update(): Promise<void>;
}
