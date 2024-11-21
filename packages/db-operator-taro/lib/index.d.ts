/**
 * Taro 框架的操作器
 * @license AGPL-3.0-or-later
 */
declare module '.';
import { Operator as IOperator, LangInfo } from '@cauact/db';
import Requester from './Requester';
import Storager from './Storager';
export default class Operator extends IOperator {
    langInfo: LangInfo;
    requesterIniter: typeof Requester;
    storagerIniter: typeof Storager;
}
