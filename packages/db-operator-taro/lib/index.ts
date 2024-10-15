/**
 * Taro 框架的操作器
 * @license GPL-2.0-or-later
 */
declare module '.';

import IOperator from '@cauact/db/lib/Operator';
import LangInfo from '@cauact/db/lib/Operator/LangInfo';
import Requester from './Requester';
import Storager from './Storager';

export default class Operator extends IOperator {
	langInfo = new LangInfo('zh-CN');
	requesterIniter = Requester;
	storagerIniter = Storager;
}
