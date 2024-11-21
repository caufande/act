/**
 * 解析错误库
 * @license AGPL-3.0-or-later
 */
declare module '.';
import { Static, TObject } from '@sinclair/typebox';
import { errorDefs } from './defs';
export type ErrorType = keyof typeof errorDefs;
export type InfosColl = {
    [I in ErrorType]: Static<TObject<(typeof errorDefs)[I]>>;
};
export declare function throwError<T extends ErrorType>(errorType: T, infos: InfosColl[T]): never;
