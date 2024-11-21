/**
 * 页面替换 请求参数定义
 * @apiName biz.navigation.replace
 */
export interface IBizNavigationReplaceParams {
    url: string;
}
/**
 * 页面替换 返回结果定义
 * @apiName biz.navigation.replace
 */
export interface IBizNavigationReplaceResult {
}
/**
 * 页面替换
 * 使用新的页面替换当前页面，当前页面会被立即销毁，展示新页面，无动画。
 * @apiName biz.navigation.replace
 * @supportVersion  ios: 3.4.6 android: 3.4.6
 */
export declare function replace$(params: IBizNavigationReplaceParams): Promise<IBizNavigationReplaceResult>;
export default replace$;
