/**
 * 设置导航左侧按钮 请求参数定义
 * @apiName biz.navigation.setLeft
 */
export interface IBizNavigationSetLeftParams {
    /** 是否控制点击事件，true 控制，false 不控制， 默认false */
    control?: boolean;
    /** 安卓端如果需要控制左上角返回事件加上这个字段，并设置为true(只给安卓使用) */
    android?: boolean;
    /** 控制显示文本，空字符串表示显示默认文本 */
    text?: string;
    /** 当control为true时，onSuccess为监听函数 */
    onSuccess?: () => void;
}
/**
 * 设置导航左侧按钮 返回结果定义
 * @apiName biz.navigation.setLeft
 */
export interface IBizNavigationSetLeftResult {
    [key: string]: any;
}
/**
 * 设置导航左侧按钮
 * @apiName biz.navigation.setLeft
 * @supportVersion  pc: 2.5.0 ios: 2.4.0 android: 2.4.0
 */
export declare function setLeft$(params: IBizNavigationSetLeftParams): Promise<IBizNavigationSetLeftResult>;
export default setLeft$;
