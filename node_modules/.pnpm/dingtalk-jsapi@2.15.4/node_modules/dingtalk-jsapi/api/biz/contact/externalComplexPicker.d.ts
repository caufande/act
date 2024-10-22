/**
 * 选外部通信录 请求参数定义
 * @apiName biz.contact.externalComplexPicker
 */
export interface IBizContactExternalComplexPickerParams {
    [key: string]: any;
}
/**
 * 选外部通信录 返回结果定义
 * @apiName biz.contact.externalComplexPicker
 */
export interface IBizContactExternalComplexPickerResult {
    [key: string]: any;
}
/**
 * 选外部通信录
 * @apiName biz.contact.externalComplexPicker
 * @supportVersion  pc: 3.0.0 ios: 3.0 android: 3.0
 */
export declare function externalComplexPicker$(params: IBizContactExternalComplexPickerParams): Promise<IBizContactExternalComplexPickerResult>;
export default externalComplexPicker$;
