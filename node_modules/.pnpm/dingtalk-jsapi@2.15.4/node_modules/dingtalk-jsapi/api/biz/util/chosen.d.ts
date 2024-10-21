/**
 * 下拉控件 请求参数定义
 * @apiName biz.util.chosen
 */
export interface IBizUtilChosenParams {
    /** 下拉控件的内容 */
    source: Array<{
        /** 显示文本 */
        key: string;
        /** 文本对应的值 */
        value: string;
    }>;
    /** 默认选中的key */
    selectedKey: string;
}
/**
 * 下拉控件 返回结果定义
 * @apiName biz.util.chosen
 */
export interface IBizUtilChosenResult {
    /** 显示文本 */
    key: string;
    /** 文本对应的值 */
    value: string;
}
/**
 * 下拉控件
 * @apiName biz.util.chosen
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function chosen$(params: IBizUtilChosenParams): Promise<IBizUtilChosenResult>;
export default chosen$;
