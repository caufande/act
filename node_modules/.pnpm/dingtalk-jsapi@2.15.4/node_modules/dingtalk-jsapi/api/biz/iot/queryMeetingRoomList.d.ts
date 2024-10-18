/**
 * 查询会议室列表 请求参数定义
 * @apiName biz.iot.queryMeetingRoomList
 */
export interface IBizIotQueryMeetingRoomListParams {
    [key: string]: any;
}
/**
 * 查询会议室列表 返回结果定义
 * @apiName biz.iot.queryMeetingRoomList
 */
export interface IBizIotQueryMeetingRoomListResult {
    [key: string]: any;
}
/**
 * 查询会议室列表
 * @apiName biz.iot.queryMeetingRoomList
 * @supportVersion ios: 4.6.34 android: 4.6.34
 */
export declare function queryMeetingRoomList$(params: IBizIotQueryMeetingRoomListParams): Promise<IBizIotQueryMeetingRoomListResult>;
export default queryMeetingRoomList$;
