/**
 * 收起下拉刷新控件 请求参数定义
 * @apiName ui.pullToRefresh.stop
 */
export interface IUiPullToRefreshStopParams {
    [key: string]: any;
}
/**
 * 收起下拉刷新控件 返回结果定义
 * @apiName ui.pullToRefresh.stop
 */
export interface IUiPullToRefreshStopResult {
    [key: string]: any;
}
/**
 * 收起下拉刷新控件
 * @apiName ui.pullToRefresh.stop
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function stop$(params: IUiPullToRefreshStopParams): Promise<IUiPullToRefreshStopResult>;
export default stop$;
