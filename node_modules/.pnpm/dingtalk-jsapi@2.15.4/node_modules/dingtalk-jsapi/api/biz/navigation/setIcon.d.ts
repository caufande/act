/**
 * 设置导航icon 请求参数定义
 * @apiName biz.navigation.setIcon
 */
export interface IBizNavigationSetIconParams {
    /** 是否显示icon */
    showIcon?: boolean;
    /** 显示的iconIndex,如文档的图 */
    iconIndex?: number;
    /** onSuccess为监听函数 */
    onSuccess?: () => void;
}
/**
 * 设置导航icon 返回结果定义
 * @apiName biz.navigation.setIcon
 */
export interface IBizNavigationSetIconResult {
}
/**
 * 标题栏添加问号Icon
 * 调用此jsapi之后，icon的显示位置在Android和iOS上有所区别,如下图
 * iOS：显示在导航栏标题的旁边，紧靠着标题
 * Android：显示在导航栏右侧按钮组的最左边
 * @apiName biz.navigation.setIcon
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function setIcon$(params: IBizNavigationSetIconParams): Promise<IBizNavigationSetIconResult>;
export default setIcon$;
