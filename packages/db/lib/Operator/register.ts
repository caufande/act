/**
 * 操作器注册
 * @license GPL-2.0-or-later
 */
declare module './register';

import Operator from '.';

let instance: Operator | null = null;
export function regOperator(operator: Operator) {
	instance = operator;
}
export function getOperator() {
	if (instance === null) throw Error('No Operator instance!');
	return instance;
}
