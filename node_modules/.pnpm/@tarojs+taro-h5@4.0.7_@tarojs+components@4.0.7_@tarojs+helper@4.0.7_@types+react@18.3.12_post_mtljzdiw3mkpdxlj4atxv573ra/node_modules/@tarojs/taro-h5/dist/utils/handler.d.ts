type TCallback<T = Partial<TaroGeneral.CallbackResult>> = (res: T) => Promise<void> | void;
interface IMethodParam<T = Partial<TaroGeneral.CallbackResult>> {
    name: string;
    success?: TCallback<T & TaroGeneral.CallbackResult>;
    fail?: TCallback;
    complete?: TCallback;
}
interface IMockPromise {
    resolve?: typeof Promise.resolve | TFunc;
    reject?: typeof Promise.reject | TFunc;
}
declare class MethodHandler<T = Partial<TaroGeneral.CallbackResult>> {
    methodName: string;
    protected __success?: TCallback<T>;
    protected __fail?: TCallback;
    protected __complete?: TCallback;
    protected isHandlerError: boolean;
    constructor({ name, success, fail, complete }: IMethodParam<T>);
    success<U = Record<string, unknown>>(res?: Partial<T> & Partial<TaroGeneral.CallbackResult>, promise?: IMockPromise): Promise<T & U & TaroGeneral.CallbackResult>;
    fail<U = Record<string, unknown>>(res?: Partial<T> & Partial<TaroGeneral.CallbackResult>, promise?: IMockPromise): Promise<T & U & TaroGeneral.CallbackResult>;
}
type TCallbackManagerFunc<T extends unknown[] = unknown[]> = (...arr: T) => void;
interface ICallbackManagerOption<T extends unknown[] = unknown[]> {
    callback?: TCallbackManagerFunc<T>;
    ctx?: any;
    [key: string]: unknown;
}
type TCallbackManagerUnit<T extends unknown[] = unknown[]> = (TCallbackManagerFunc<T> | ICallbackManagerOption<T>);
declare class CallbackManager<T extends unknown[] = unknown[]> {
    callbacks: TCallbackManagerUnit<T>[];
    /** 添加回调 */
    add: (opt?: TCallbackManagerUnit<T>) => void;
    /** 移除回调 */
    remove: (opt?: TCallbackManagerUnit<T>) => void;
    /** 获取回调函数数量 */
    count: () => number;
    /** 触发回调 */
    trigger: (...args: T) => void;
    /** 清空所有回调 */
    clear: () => void;
}
export { MethodHandler, CallbackManager };
