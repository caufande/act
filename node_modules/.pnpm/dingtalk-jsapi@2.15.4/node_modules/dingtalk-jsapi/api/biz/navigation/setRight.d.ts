/**
 * 设置导航右侧按钮 请求参数定义
 * @apiName biz.navigation.setRight
 */
export interface IBizNavigationSetRightParams {
    /** 控制按钮显示， true 显示， false 隐藏， 默认true */
    show?: boolean;
    /** 是否控制点击事件，true 控制，false 不控制， 默认false */
    control?: boolean;
    /** 控制显示文本，空字符串表示显示默认文本 */
    text?: string;
    /** 当control为true时，onSuccess为监听函数 */
    onSuccess?: () => void;
}
/**
 * 设置导航右侧按钮 返回结果定义
 * @apiName biz.navigation.setRight
 */
export interface IBizNavigationSetRightResult {
    [key: string]: any;
}
/**
 * 设置导航栏右侧单个按钮
 * 调用jsapi-setRight可以设置导航栏最右侧按钮的文字，并且接收点击事件，
 * 只能设置文本按钮，需要设置按钮的icon请查看 biz.navigation.setMenu
 * @apiName biz.navigation.setRight
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function setRight$(params: IBizNavigationSetRightParams): Promise<IBizNavigationSetRightResult>;
export default setRight$;
