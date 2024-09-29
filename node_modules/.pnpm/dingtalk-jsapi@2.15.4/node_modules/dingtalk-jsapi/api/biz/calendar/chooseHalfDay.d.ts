/**
 * 唤起月历组件，并选择其中半天 请求参数定义
 * @apiName biz.calendar.chooseHalfDay
 */
export interface IBizCalendarChooseHalfDayParams {
    default?: number;
}
/**
 * 唤起月历组件，并选择其中半天 返回结果定义
 * @apiName biz.calendar.chooseHalfDay
 */
export interface IBizCalendarChooseHalfDayResult {
    /** 时间戳，如果用户选择上午，则为当日0点的时间；如果是下午，则为当日12点的时间；单位为毫秒ms */
    chosen: number;
    /** 整型，用户当前所在时区 */
    timezone: number;
}
/**
 * 唤起月历组件，并选择其中半天
 * @apiName biz.calendar.chooseHalfDay
 * @supportVersion  ios: 3.5.0 android: 3.5.0
 */
export declare function chooseHalfDay$(params: IBizCalendarChooseHalfDayParams): Promise<IBizCalendarChooseHalfDayResult>;
export default chooseHalfDay$;
