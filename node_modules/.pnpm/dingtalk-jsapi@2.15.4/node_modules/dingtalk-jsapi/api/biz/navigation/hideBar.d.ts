/**
 * JS端控制容器导航栏的显示和隐藏 请求参数定义
 * @apiName biz.navigation.hideBar
 */
export interface IBizNavigationHideBarParams {
    [key: string]: any;
}
/**
 * JS端控制容器导航栏的显示和隐藏 返回结果定义
 * @apiName biz.navigation.hideBar
 */
export interface IBizNavigationHideBarResult {
    [key: string]: any;
}
/**
 * JS端控制容器导航栏的显示和隐藏
 * @apiName biz.navigation.hideBar
 * @supportVersion  ios: 3.5.6 android: 3.5.6
 */
export declare function hideBar$(params: IBizNavigationHideBarParams): Promise<IBizNavigationHideBarResult>;
export default hideBar$;
