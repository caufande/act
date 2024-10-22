/**
 * 弹窗alert 请求参数定义
 * @apiName biz.navigation.setTitle
 */
export interface IBizNavigationSetTitleParams {
    /** 控制标题文本，空字符串表示显示默认文本 */
    title?: string;
    /** 副标题 */
    subTitle?: string;
}
/**
 * 弹窗alert 返回结果定义
 * @apiName biz.navigation.setTitle
 */
export interface IBizNavigationSetTitleResult {
}
/**
 * 设置导航栏标题
 * 此JSAPI在iOS和Android上的显示有所不同
 * IOS：根据iOS的设计规范，iOS的标题在导航栏正中央
 * Android：根据Android的设计规范，标题显示在导航栏左侧
 * @apiName biz.navigation.setTitle
 * @supportVersion  pc: 2.5.0 ios: 2.4.0 android: 2.4.0
 */
export declare function setTitle$(params: IBizNavigationSetTitleParams): Promise<IBizNavigationSetTitleResult>;
export default setTitle$;
