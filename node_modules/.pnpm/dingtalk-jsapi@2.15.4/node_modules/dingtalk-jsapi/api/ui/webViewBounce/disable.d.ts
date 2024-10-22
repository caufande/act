/**
 * 禁用webview下拉弹性效果 请求参数定义
 * @apiName ui.webViewBounce.disable
 */
export interface IUiWebViewBounceDisableParams {
    [key: string]: any;
}
/**
 * 禁用webview下拉弹性效果 返回结果定义
 * @apiName ui.webViewBounce.disable
 */
export interface IUiWebViewBounceDisableResult {
    [key: string]: any;
}
/**
 * 禁用webview下拉弹性效果
 * @apiName ui.webViewBounce.disable
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function disable$(params: IUiWebViewBounceDisableParams): Promise<IUiWebViewBounceDisableResult>;
export default disable$;
