/**
 * 打开窗口 请求参数定义
 * @apiName biz.util.presentWindow
 */
export interface IBizUtilPresentWindowParams {
    [key: string]: any;
}
/**
 * 打开窗口 返回结果定义
 * @apiName biz.util.presentWindow
 */
export interface IBizUtilPresentWindowResult {
    [key: string]: any;
}
/**
 * 打开窗口
 * @apiName biz.util.presentWindow
 * @supportVersion  ios: 2.8.0 android: 2.8.0
 */
export declare function presentWindow$(params: IBizUtilPresentWindowParams): Promise<IBizUtilPresentWindowResult>;
export default presentWindow$;
