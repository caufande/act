/**
 * 关闭webview 请求参数定义
 * @apiName biz.navigation.close
 */
export interface IBizNavigationCloseParams {
}
/**
 * 关闭webview 返回结果定义
 * @apiName biz.navigation.close
 */
export interface IBizNavigationCloseResult {
}
/**
 * 关闭webview
 * 调用此接口可以关闭当前浏览器窗口
 * @apiName biz.navigation.close
 * @supportVersion  ios: 2.4.0 android: 2.4.0 pc: 4.3.5
 */
export declare function close$(params: IBizNavigationCloseParams): Promise<IBizNavigationCloseResult>;
export default close$;
