/**
 * 添加到黏贴板 请求参数定义
 * @apiName biz.clipboardData.setData
 */
export interface IBizClipboardDataSetDataParams {
    /** 要复制粘贴板的内容 */
    text: string;
}
/**
 * 添加到黏贴板 返回结果定义
 * @apiName biz.clipboardData.setData
 */
export interface IBizClipboardDataSetDataResult {
}
/**
 * 添加到黏贴板
 * @apiName biz.clipboardData.setData
 * @supportVersion  ios: 2.7.0 android: 2.7.0
 */
export declare function setData$(params: IBizClipboardDataSetDataParams): Promise<IBizClipboardDataSetDataResult>;
export default setData$;
