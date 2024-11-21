/**
 * 日期选择器 请求参数定义
 * @apiName biz.util.datepicker
 */
export interface IBizUtilDatepickerParams {
    /** format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd */
    format?: string;
    /** 默认显示日期 */
    value?: string;
}
/**
 * 日期选择器 返回结果定义
 * @apiName biz.util.datepicker
 */
export interface IBizUtilDatepickerResult {
    /** 返回选择的日期 */
    value: string;
}
/**
 * 日期选择器
 * @description 注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
 * @apiName biz.util.datepicker
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function datepicker$(params: IBizUtilDatepickerParams): Promise<IBizUtilDatepickerResult>;
export default datepicker$;
