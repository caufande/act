/**
 * 设置导航栏右侧多个按钮 请求参数定义
 * @apiName biz.navigation.setMenu
 */
export interface IBizNavigationSetMenuParams {
    /** 下拉菜单背景色，例如#ADD8E6 */
    backgroundColor?: string;
    /** 下拉菜单文字颜色 例如#ADD8E611 */
    textColor?: string;
    /** 多个按钮的属性数组 */
    items: Array<{
        /** 每一个item的唯一标示 */
        id: string;
        /** 钉钉预置icon的索引值 */
        iconId?: string;
        /** item的文字属性 */
        text: string;
        /** 是否显示红点 */
        showRedDot?: boolean;
        /** badge 内容 */
        badge?: string;
        /** 定义图标url */
        url?: string;
    }>;
    /** 点击任一一个按钮将会回调onSuccess，并返回被点击item的id */
    onSuccess?: (data: IBizNavigationSetMenuResult) => void;
}
/**
 * 设设置导航栏右侧多个按钮 返回结果定义
 * @apiName biz.navigation.setMenu
 */
export interface IBizNavigationSetMenuResult {
    id: string;
}
/**
 * 设置导航栏右侧多个按钮
 * 每一个item对应右上角的一个按钮
 * @apiName biz.navigation.setMenu
 * @supportVersion  ios: 2.6.0 android: 2.6.0
 */
export declare function setMenu$(params: IBizNavigationSetMenuParams): Promise<IBizNavigationSetMenuResult>;
export default setMenu$;
