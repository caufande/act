/**
 * 时间选择器 请求参数定义
 * @apiName biz.util.timepicker
 */
export interface IBizUtilTimepickerParams {
    /** 时间格式 */
    format?: string;
    /** 默认显示时间 */
    value?: string;
}
/**
 * 时间选择器 返回结果定义
 * @apiName biz.util.timepicker
 */
export interface IBizUtilTimepickerResult {
    /** 返回选择的时间 */
    value: string;
}
/**
 * 时间选择器
 * @apiName biz.util.timepicker
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function timepicker$(params: IBizUtilTimepickerParams): Promise<IBizUtilTimepickerResult>;
export default timepicker$;
