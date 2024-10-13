/**
 * 操作器定义
 * @license GPL-2.0-or-later
 */
declare module '.';

import { RequesterIniter } from './requester';
import { StoragerIniter } from './storager';

export * from './requester';
export * from './storager';

export default abstract class Operator {
	abstract requesterIniter: RequesterIniter;
	abstract storagerIniter: StoragerIniter;
}
