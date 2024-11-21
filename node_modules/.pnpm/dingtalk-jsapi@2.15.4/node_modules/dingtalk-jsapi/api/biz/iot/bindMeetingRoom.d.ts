/**
 * 设备与会议室绑定 请求参数定义
 * @apiName biz.iot.bindMeetingRoom
 */
export interface IBizIotBindMeetingRoomParams {
    [key: string]: any;
}
/**
 * 设备与会议室绑定 返回结果定义
 * @apiName biz.iot.bindMeetingRoom
 */
export interface IBizIotBindMeetingRoomResult {
    [key: string]: any;
}
/**
 * 设备与会议室绑定
 * @apiName biz.iot.bindMeetingRoom
 * @supportVersion ios: 4.6.34 android: 4.6.34
 */
export declare function bindMeetingRoom$(params: IBizIotBindMeetingRoomParams): Promise<IBizIotBindMeetingRoomResult>;
export default bindMeetingRoom$;
