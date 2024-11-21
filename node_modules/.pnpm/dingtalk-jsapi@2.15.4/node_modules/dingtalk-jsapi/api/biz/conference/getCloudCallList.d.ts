/**
 * 办公电话话单查询 请求参数定义
 * @apiName biz.conference.getCloudCallList
 */
export interface IBizConferenceGetCloudCallListParams {
    corpId: string;
    sessionId?: string;
    bizNumber?: string;
    startTime: string;
    endTime: string;
    staffIdList?: string;
    direction?: number;
    index?: number;
    pageSize?: number;
}
/**
 * 办公电话话单查询 返回结果定义
 * @apiName biz.conference.getCloudCallList
 */
export interface IBizConferenceGetCloudCallListResult {
    code: number;
    cause: string;
    total: number;
    callList?: any[];
    hasMore: boolean;
    currentIndex: number;
}
/**
 * 办公电话话单查询
 * @apiName biz.conference.getCloudCallList
 * @supportVersion ios: 6.0.0 android: 6.0.0 pc: 6.0.9
 * @author Android：洛洋, iOS：度尽, pc：远觉
 */
export declare function getCloudCallList$(params: IBizConferenceGetCloudCallListParams): Promise<IBizConferenceGetCloudCallListResult>;
export default getCloudCallList$;
