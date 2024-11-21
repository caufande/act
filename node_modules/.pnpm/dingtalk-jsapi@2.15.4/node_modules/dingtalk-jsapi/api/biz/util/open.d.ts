/**
 * 打开应用内页面 请求参数定义
 * @apiName biz.util.open
 */
export interface IBizUtilOpenParams {
    /** 页面名称 */
    name: string;
    /** 传参 */
    params?: any;
}
/**
 * 打开应用内页面 返回结果定义
 * @apiName biz.util.open
 */
export interface IBizUtilOpenResult {
}
/**
 * 打开应用内页面
 * @apiName biz.util.open
 * @supportVersion  pc: 2.7.0 ios: 2.4.0 android: 2.4.0
 */
export declare function open$(params: IBizUtilOpenParams): Promise<IBizUtilOpenResult>;
export default open$;
