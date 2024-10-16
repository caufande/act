/**
 * 解析错误库
 * @license GPL-2.0-or-later
 */
declare module '.';

import { Static, TObject, Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { errorDefs } from './defs';
import { getTip } from './names';

export type ErrorType = keyof typeof errorDefs;
export type InfosColl = { [I in ErrorType]: Static<TObject<(typeof errorDefs)[I]>> };

export function throwError<T extends ErrorType>(errorType: T, infos: InfosColl[T]): never {
	Value.Assert(Type.Object(errorDefs[errorType]), infos);
	throw [getTip(errorType), infos];
}
