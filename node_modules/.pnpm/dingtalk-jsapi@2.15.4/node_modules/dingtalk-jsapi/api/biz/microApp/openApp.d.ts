/**
 * 打开应用 请求参数定义
 * @apiName biz.microApp.openApp
 */
export interface IBizMicroAppOpenAppParams {
    agentId: string;
    appId: string;
    corpId: string;
}
/**
 * 打开应用 返回结果定义
 * @apiName biz.microApp.openApp
 */
export interface IBizMicroAppOpenAppResult {
    /** 结果，int （-1 unkown，0 fail，1 success） */
    result: number;
}
/**
 * 打开应用
 * @apiName biz.microApp.openApp
 * @supportVersion ios: 4.5.6 android: 4.5.6
 */
export declare function openApp$(params: IBizMicroAppOpenAppParams): Promise<IBizMicroAppOpenAppResult>;
export default openApp$;
