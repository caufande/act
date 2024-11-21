/**
 * 错误信息翻译
 * @license AGPL-3.0-or-later
 */
declare module './names';
import { ErrorType } from '.';
import { LangMap } from '../lang';
type ErrorNames = Record<ErrorType, LangMap>;
export declare function getTip(errorType: ErrorType): string;
export declare const errorName: LangMap;
export declare const errorNames: ErrorNames;
export {};
