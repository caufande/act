/**
 * 钉钉校园获取新消息通知状态 请求参数定义
 * @apiName biz.edu.newMsgNotificationStatus
 */
export interface IBizEduNewMsgNotificationStatusParams {
}
/**
 * 钉钉校园获取新消息通知状态 返回结果定义
 * @apiName biz.edu.newMsgNotificationStatus
 */
export interface IBizEduNewMsgNotificationStatusResult {
    /** 新消息通知，开关状态 */
    imNoticeStatus: boolean;
    /** 语音和视频通话邀请通知，开关状态 */
    avNoticeStatus: boolean;
}
/**
 * 钉钉校园获取新消息通知状态
 * @apiName biz.edu.newMsgNotificationStatus
 * @supportVersion ios: 6.3.20 android: 6.3.20
 * @author Android：绝色 iOS： 景松
 */
export declare function newMsgNotificationStatus$(params: IBizEduNewMsgNotificationStatusParams): Promise<IBizEduNewMsgNotificationStatusResult>;
export default newMsgNotificationStatus$;
