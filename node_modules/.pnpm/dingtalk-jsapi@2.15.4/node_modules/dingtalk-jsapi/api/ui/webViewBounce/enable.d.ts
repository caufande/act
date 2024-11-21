/**
 * 启用webview下拉弹性效果 请求参数定义
 * @apiName ui.webViewBounce.enable
 */
export interface IUiWebViewBounceEnableParams {
    [key: string]: any;
}
/**
 * 启用webview下拉弹性效果 返回结果定义
 * @apiName ui.webViewBounce.enable
 */
export interface IUiWebViewBounceEnableResult {
    [key: string]: any;
}
/**
 * 启用webview下拉弹性效果
 * @apiName ui.webViewBounce.enable
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function enable$(params: IUiWebViewBounceEnableParams): Promise<IUiWebViewBounceEnableResult>;
export default enable$;
