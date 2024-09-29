/**
 * 唤起月历组件，并选择其中某具体时间(精度到分钟) 请求参数定义
 * @apiName biz.calendar.chooseDateTime
 */
export interface IBizCalendarChooseDateTimeParams {
    /** 时间戳，默认选中时间，单位为毫秒ms */
    default?: number;
}
/**
 * 唤起月历组件，并选择其中某具体时间(精度到分钟) 返回结果定义
 * @apiName biz.calendar.chooseDateTime
 */
export interface IBizCalendarChooseDateTimeResult {
    [key: string]: any;
}
/**
 * 唤起月历组件，并选择其中某具体时间(精度到分钟)
 * @description 选择的时间精确到分钟
 * @apiName biz.calendar.chooseDateTime
 * @supportVersion  ios: 3.5.0 android: 3.5.0
 */
export declare function chooseDateTime$(params: IBizCalendarChooseDateTimeParams): Promise<IBizCalendarChooseDateTimeResult>;
export default chooseDateTime$;
