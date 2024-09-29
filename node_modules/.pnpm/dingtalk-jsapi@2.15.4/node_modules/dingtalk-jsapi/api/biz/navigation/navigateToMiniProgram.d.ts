/**
 * 从H5启动小程序的专用接口 请求参数定义
 * @apiName biz.navigation.navigateToMiniProgram
 */
export interface IBizNavigationNavigateToMiniProgramParams {
    appId: string;
    path?: string;
    extraData?: string;
    /** 小程序 buildId，用于打开特定小程序版本（目的方便测试，并且，A 跳 B，如果 A 小程序是线上版本，自动忽略该参数 */
    buildId?: string;
    /** 目标小程序启动相关的参数 */
    ddAppParams?: any;
}
/**
 * 从H5启动小程序的专用接口 返回结果定义
 * @apiName biz.navigation.navigateToMiniProgram
 */
export interface IBizNavigationNavigateToMiniProgramResult {
}
/**
 * 从H5启动小程序的专用接口
 * @apiName biz.navigation.navigateToMiniProgram
 * @supportVersion ios: 5.1.31 android: 5.1.31
 * @author Android：泠轩 iOS：序元
 */
export declare function navigateToMiniProgram$(params: IBizNavigationNavigateToMiniProgramParams): Promise<IBizNavigationNavigateToMiniProgramResult>;
export default navigateToMiniProgram$;
