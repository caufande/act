/**
 * 唤起月历组件，并选择日期区间，并以“天”为维度 请求参数定义
 * @apiName biz.calendar.chooseInterval
 */
export interface IBizCalendarChooseIntervalParams {
    /** 时间戳，默认开始时间，单位为毫秒ms */
    defaultStart: number;
    /** 时间戳，默认结束时间，单位为毫秒ms */
    defaultEnd: number;
}
/**
 * 唤起月历组件，并选择日期区间，并以“天”为维度 返回结果定义
 * @apiName biz.calendar.chooseInterval
 */
export interface IBizCalendarChooseIntervalResult {
    /** 时间戳，为起始当日0点的时间，单位为毫秒ms */
    start: number;
    /** 时间戳，为截止当日0点的时间，单位为毫秒ms */
    end: number;
    /** 整型，用户当前所在时区 */
    timezone: number;
}
/**
 * 唤起月历组件，并选择日期区间，并以“天”为维度
 * @description 依赖钉钉客户端3.5.0以上版本
 * @apiName biz.calendar.chooseInterval
 * @supportVersion  ios: 3.5.0 android: 3.5.0
 */
export declare function chooseInterval$(params: IBizCalendarChooseIntervalParams): Promise<IBizCalendarChooseIntervalResult>;
export default chooseInterval$;
