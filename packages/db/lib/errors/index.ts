/**
 * 解析错误库
 * @license GPL-2.0-or-later
 */
declare module '.';

import { errorDefs } from './defs';
import { getTip } from './names';

export type ErrorType = keyof typeof errorDefs;
export type InfosColl = { [I in ErrorType]: Parameters<(typeof errorDefs)[I]>[0]; };

export function throwError<T extends ErrorType>(errorType: T, infos: InfosColl[T]): never {
	throw [getTip(errorType), infos];
}
