/**
 * node 环境的操作器
 * @license AGPL-3.0-or-later
 */
declare module '.';

import { Operator as IOperator, LangInfo, RequesterIniter } from '@cauact/db';
import Requester from './Requester';
import Storager from './Storager';

export default class Operator extends IOperator {
	constructor(
		protected readonly debug = false,
	) {
		super();
		this.requesterIniter = Requester.getIniter(debug);
	}

	langInfo = new LangInfo('zh-CN');
	requesterIniter: RequesterIniter;
	storagerIniter = Storager;
}
