/**
 * 解析错误库
 * @license GPL-2.0-or-later
 */
declare module '.';

import Operator from '../Operator';
import { getTip } from './names';
import { errorDefs } from './defs';

export type ErrorType = keyof typeof errorDefs;
export type InfosColl = { [I in ErrorType]: Parameters<(typeof errorDefs)[I]>[0]; };

export type Thrower = <T extends ErrorType>(errorType: T, infos: InfosColl[T]) => never;

export function getThrower(operator: Operator): Thrower {
	return (errorType, infos) => {
		throw [getTip(operator, errorType), infos];
	};
}
