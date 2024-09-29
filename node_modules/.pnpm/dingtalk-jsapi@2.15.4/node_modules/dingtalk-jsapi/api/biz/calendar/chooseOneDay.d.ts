/**
 * 唤起月历组件，选择某天 请求参数定义
 * @apiName biz.calendar.chooseOneDay
 */
export interface IBizCalendarChooseOneDayParams {
    /** 时间戳，默认选中时间，单位为毫秒ms */
    default?: number;
}
/**
 * 唤起月历组件，选择某天 返回结果定义
 * @apiName biz.calendar.chooseOneDay
 */
export interface IBizCalendarChooseOneDayResult {
    /** 时间戳，用户选择日期当日0点的时间(在用户时区)，单位为毫秒ms */
    chosen: number;
    /** 整型，用户当前所在时区 */
    timezone: number;
}
/**
 * 唤起月历组件，选择某天
 * @description 依赖钉钉客户端3.5.0以上版本
 * @apiName biz.calendar.chooseOneDay
 * @supportVersion  ios: 3.5.0 android: 3.5.0
 */
export declare function chooseOneDay$(params: IBizCalendarChooseOneDayParams): Promise<IBizCalendarChooseOneDayResult>;
export default chooseOneDay$;
