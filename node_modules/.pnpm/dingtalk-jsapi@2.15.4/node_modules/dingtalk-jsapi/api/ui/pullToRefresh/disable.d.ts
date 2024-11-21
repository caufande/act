/**
 * 禁用下拉刷新功能 请求参数定义
 * @apiName ui.pullToRefresh.disable
 */
export interface IUiPullToRefreshDisableParams {
    [key: string]: any;
}
/**
 * 禁用下拉刷新功能 返回结果定义
 * @apiName ui.pullToRefresh.disable
 */
export interface IUiPullToRefreshDisableResult {
    [key: string]: any;
}
/**
 * 禁用下拉刷新功能
 * @apiName ui.pullToRefresh.disable
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function disable$(params: IUiPullToRefreshDisableParams): Promise<IUiPullToRefreshDisableResult>;
export default disable$;
