/**
 * 解析错误库
 * @license GPL-2.0-or-later
 */
declare module './error';

import Operator from '../Operator';
import { getTip } from './names';

type ErrorDefs = Record<string, (n: any) => any>;
const errorDefs = {
	NoTitle: (n: { floor: number }) => n,
	NoBigTitle: (n: { floor: number }) => n,
} satisfies ErrorDefs;

export type ErrorType = keyof typeof errorDefs;
export type InfosColl = { [I in ErrorType]: Parameters<(typeof errorDefs)[I]>[0]; };

export function getThrower(operator: Operator) {
	return <T extends ErrorType>(errorType: T, infos: InfosColl[T]) => {
		throw [getTip(operator, errorType), infos];
	};
}
