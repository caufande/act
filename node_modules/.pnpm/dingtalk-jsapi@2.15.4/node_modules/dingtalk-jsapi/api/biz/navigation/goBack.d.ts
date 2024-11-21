/**
 * 返回上一步 请求参数定义
 * @apiName biz.navigation.goBack
 */
export interface IBizNavigationGoBackParams {
}
/**
 * 返回上一步 返回结果定义
 * @apiName biz.navigation.goBack
 */
export interface IBizNavigationGoBackResult {
}
/**
 * 返回上一步
 * 调用此接口会返回前端页面的上级浏览页面，如果是H5的根页面，调用此接口会关闭当前浏览窗口。
 * @apiName biz.navigation.goBack
 * @supportVersion  ios: 2.6.0 android: 2.6.0
 */
export declare function goBack$(params: IBizNavigationGoBackParams): Promise<IBizNavigationGoBackResult>;
export default goBack$;
