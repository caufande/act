export interface IErrorMessage {
    /** the error code */
    errorCode?: string;
    /** the error message */
    errorMessage?: string;
}
export interface ICallbackOption<S> {
    onSuccess?(data: S): void;
    onFail?(err: IErrorMessage): void;
    onCancel?(err: IErrorMessage): void;
}
export declare type IJSBridge = (method: string, params: any) => Promise<any>;
export declare type ICommonAPI<S, T> = (params: S & ICallbackOption<T>) => Promise<T>;
export interface IInvokeAPIConfigMap {
    [platform: string]: IAPIConfig | undefined;
}
export interface IAPIConfig {
    /** the minSupport version about the API */
    vs: string | {
        [platformSub: string]: string;
    };
    paramsDeal?: (params: object) => object;
    resultDeal?: (res: any) => any;
}
export interface IJSBridgeMap {
    [platform: string]: IJSBridge | undefined;
}
export interface IInvokeAPIConfigMapByMethod {
    [method: string]: IInvokeAPIConfigMap | undefined;
}
export declare function isFunction(param: any): boolean;
/**
 * when origin >= target ,return true
 * 关于为什么没有跟otherApi保持一致，主要是当初因为otherApi里的方法是复制旧版jsapi的，有一定缺陷
 * 但是担心线上环境利用了缺陷来做逻辑，所以没有保持一致使用同一个方法
 * TODO: 但其实另起方法太冗余，以及丑陋，后续还是需要整个统一掉
 * @param origin
 * @param target
 */
export declare function compareVersion(origin: string, target: string): boolean;
export declare enum ERROR_CODE {
    cancel = "-1",
    not_exist = "1",
    no_permission = "7",
    jsapi_internal_error = "22"
}
export declare enum ENV_ENUM {
    pc = "pc",
    android = "android",
    ios = "ios",
    notInDingTalk = "notInDingTalk"
}
export declare enum ENV_ENUM_SUB {
    mac = "mac",
    win = "win",
    noSub = "noSub"
}
export declare enum APP_TYPE {
    WEB = "WEB",
    MINI_APP = "MINI_APP",
    WEEX = "WEEX",
    WEBVIEW_IN_MINIAPP = "WEBVIEW_IN_MINIAPP",
    WEEX_WIDGET = "WEEX_WIDGET"
}
export interface IENV {
    /** current platform (iOS or Android or PC or NotInDingTalk) */
    platform: ENV_ENUM;
    /** current sub platfor (support mac & win) */
    platformSub: ENV_ENUM_SUB;
    /** current client version */
    version?: string;
    /** @deprecated recommend use navigator.language to get current language */
    language?: string;
    /** current appType(web or eapp or weex) */
    appType: APP_TYPE;
    [key: string]: any;
}
export interface IConfigParams {
    jsApiList?: string[];
    [key: string]: any;
}
export interface IDevConfigParams {
    /** 是否开启调试模式 */
    debug?: boolean;
    /** 是否校验Api是否支持等 */
    isAuthApi?: boolean;
    /** 废除兼容性处理 */
    isDisableDeal?: boolean;
    /** 部分接口废除兼容性处理 */
    disbaleDealApiWhiteList?: string[];
    /** 接口层面开启兼容性处理，优先级大于废除逻辑 */
    forceEnableDealApiFnMap?: {
        [apiName: string]: (params: any) => boolean;
    };
    onBeforeInvokeAPI?: (data: {
        invokeId: string;
        method: string;
        startTime: number;
        params: any;
    }) => void;
    onAfterInvokeAPI?: (data: {
        invokeId: string;
        method: string;
        params: any;
        payload: any;
        duration: number;
        startTime: number;
        isSuccess: boolean;
    }) => void;
    extraPlatform?: IPlatformConfig;
}
export interface IEvent {
    preventDefault: () => void;
}
export declare enum LogLevel {
    INFO = 1,
    WARNING = 2,
    ERROR = 3
}
export interface ILog {
    level: LogLevel;
    text: any[];
    time: Date;
}
export declare type ILogFn = (option: ILog) => void;
export interface IPlatformConfig {
    platform: string;
    authMethod: string;
    authParamsDeal?: (params: object) => object;
    bridgeInit: () => Promise<IJSBridge>;
    event: {
        on: (type: string, handler: (e: IEvent) => void) => void;
        off: (type: string, handler: (e: IEvent) => void) => void;
    };
}
export interface ICheckJsApiParams {
    jsApiList?: string[];
}
export interface ICheckJsApiResult {
    [jsApi: string]: boolean;
}
export declare type ICheckJsApiFn = (params: ICheckJsApiParams) => Promise<ICheckJsApiResult>;
export interface IUNCore {
    /** 当config权限校验成功时触发readyCallback */
    ready: (readyCallback: () => void) => void;
    /** 当config权限校验成功时触发readyCallback */
    error: (callback: (err: any) => void) => void;
    /** 配置权限校验参数, 即可启动校验，启动校验成功后可以让本没有权限的接口获取权限，如果你的域名是白名单或者调用的接口不需要校验，可不用调用此接口 */
    config: (configParams: IConfigParams) => void;
    /** 配置开发选项 */
    devConfig: (devConfigParams: IDevConfigParams) => void;
    /** 推荐使用on绑定方法, 替代原本document的方式 */
    on: (methodName: string, listener: (e: IEvent | any) => void) => void;
    /** 推荐使用off解绑方法,替代document的方式 */
    off: (methodName: string, listener: (e: IEvent | any) => void) => void;
    /** 当前运行时的环境变量 */
    env: IENV;
    /**
     * 提供检测jsapi能力的接口
     * @description 本接口原理依赖于 JSAPI 的静态支持版本数据，故存在一定的误差
     * @deprecated 移动端上推荐使用 plugin/checkJsApi.ts 来检测真实环境下的支持情况
     */
    checkJsApi: ICheckJsApiFn;
    /** 直接通过method名调用jsapi，新的接口基本不存在多端不一致的问题，可以使用此接口代替。注意：但如果直接调用旧的jsapi接口，且没有引入对应接口库，将不会对入参出参进行兼容操作 */
    _invoke: (method: string, params?: any) => Promise<any>;
}
export interface IConfigCoreMap {
    [platform: string]: IPlatformConfig | undefined;
}
