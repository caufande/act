/**
 * 日期时间控件 请求参数定义
 * @apiName biz.util.datetimepicker
 */
export interface IBizUtilDatetimepickerParams {
    /** 日期和时间的格式 */
    format?: string;
    /** 默认显示日期和时间 */
    value?: string;
}
/**
 * 日期时间控件 返回结果定义
 * @apiName biz.util.datetimepicker
 */
export interface IBizUtilDatetimepickerResult {
    /** 返回选择的日期和时间 */
    value: string;
}
/**
 * 日期时间控件
 * @apiName biz.util.datetimepicker
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function datetimepicker$(params: IBizUtilDatetimepickerParams): Promise<IBizUtilDatetimepickerResult>;
export default datetimepicker$;
