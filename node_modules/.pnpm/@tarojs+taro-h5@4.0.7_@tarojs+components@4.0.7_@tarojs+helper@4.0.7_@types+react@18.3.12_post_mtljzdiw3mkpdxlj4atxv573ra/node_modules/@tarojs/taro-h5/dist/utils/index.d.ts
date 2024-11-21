import { TaroElement } from '@tarojs/runtime';
declare function shouldBeObject(target: unknown): {
    flag: boolean;
    msg?: undefined;
} | {
    flag: boolean;
    msg: string;
};
declare function findDOM(inst?: any): TaroElement | HTMLElement | undefined;
interface IParameterErrorParam {
    name?: string;
    para?: string;
    correct?: string;
    wrong?: unknown;
    level?: 'warn' | 'error' | 'log' | 'info' | 'debug';
}
declare function getParameterError({ name, para, correct, wrong, level }: IParameterErrorParam): string;
declare function upperCaseFirstLetter(string: any): any;
declare function inlineStyle(style: any): string;
declare function setTransform(el: any, val: any): void;
declare function serializeParams(params: any): string;
declare function temporarilyNotSupport(name?: string): (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
declare function weixinCorpSupport(name: string): (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
declare function permanentlyNotSupport(name?: string): (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
interface IProcessOpenApi<TOptions = Record<string, unknown>, TResult extends TaroGeneral.CallbackResult = any> {
    name: string;
    defaultOptions?: TOptions;
    standardMethod?: (opts: TOptions) => Promise<TResult>;
    formatOptions?: (opts: TOptions) => TOptions;
    formatResult?: (res: TResult) => TResult;
}
declare function processOpenApi<TOptions = Record<string, unknown>, TResult extends TaroGeneral.CallbackResult = any>({ name, defaultOptions, standardMethod, formatOptions, formatResult }: IProcessOpenApi<TOptions, TResult>): (options?: Partial<TOptions>, ...args: any[]) => Promise<TResult>;
/**
 * 获取当前页面路径
 * @returns
 */
declare function getCurrentPath(): string;
export { shouldBeObject, findDOM, getParameterError, upperCaseFirstLetter, inlineStyle, setTransform, serializeParams, temporarilyNotSupport, weixinCorpSupport, permanentlyNotSupport, processOpenApi, getCurrentPath };
export * from "./animation.js";
export * from "./helper.js";
export * from "./valid.js";
