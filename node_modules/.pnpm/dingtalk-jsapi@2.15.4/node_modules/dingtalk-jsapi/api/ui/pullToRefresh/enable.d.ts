/**
 * 启用下拉刷新功能 请求参数定义
 * @apiName ui.pullToRefresh.enable
 */
export interface IUiPullToRefreshEnableParams {
    /** onSuccess为监听函数 */
    onSuccess?: () => void;
}
/**
 * 启用下拉刷新功能 返回结果定义
 * @apiName ui.pullToRefresh.enable
 */
export interface IUiPullToRefreshEnableResult {
    [key: string]: any;
}
/**
 * 启用下拉刷新功能
 * @apiName ui.pullToRefresh.enable
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function enable$(params: IUiPullToRefreshEnableParams): Promise<IUiPullToRefreshEnableResult>;
export default enable$;
