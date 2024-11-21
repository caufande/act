/**
 * node 环境的操作器
 * @license AGPL-3.0-or-later
 */
declare module '.';
import { Operator as IOperator, LangInfo, RequesterIniter } from '@cauact/db';
import Storager from './Storager';
export default class Operator extends IOperator {
    protected readonly debug: boolean;
    constructor(debug?: boolean);
    langInfo: LangInfo;
    requesterIniter: RequesterIniter;
    storagerIniter: typeof Storager;
}
