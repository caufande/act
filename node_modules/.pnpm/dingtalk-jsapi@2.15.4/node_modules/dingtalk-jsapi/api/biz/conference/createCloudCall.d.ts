/**
 * 办公电话直接拨打 请求参数定义
 * @apiName biz.conference.createCloudCall
 */
export interface IBizConferenceCreateCloudCallParams {
    corpId: string;
    bizNumber: string;
    calleeNumber: string;
    closePushCallRecord?: boolean;
    openCallRecord?: boolean;
    hideCalleeNumber?: boolean;
}
/**
 * 办公电话直接拨打 返回结果定义
 * @apiName biz.conference.createCloudCall
 */
export interface IBizConferenceCreateCloudCallResult {
    code: number;
    cause: string;
    sessionId: string;
}
/**
 * 办公电话直接拨打
 * @apiName biz.conference.createCloudCall
 * @supportVersion ios: 6.0.0 android: 6.0.0 pc: 6.0.9
 * @author Android：洛洋, iOS：度尽, pc：远觉
 */
export declare function createCloudCall$(params: IBizConferenceCreateCloudCallParams): Promise<IBizConferenceCreateCloudCallResult>;
export default createCloudCall$;
