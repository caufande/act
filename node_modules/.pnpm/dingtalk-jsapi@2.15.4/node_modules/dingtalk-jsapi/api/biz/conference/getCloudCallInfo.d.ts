/**
 * 办公电话话单查询 请求参数定义
 * @apiName biz.conference.getCloudCallInfo
 */
export interface IBizConferenceGetCloudCallInfoParams {
    corpId: string;
}
/**
 * 办公电话话单查询 返回结果定义
 * @apiName biz.conference.getCloudCallInfo
 */
export interface IBizConferenceGetCloudCallInfoResult {
    code: number;
    cause: string;
    hasOpen: boolean;
    bizNumberList?: string[];
}
/**
 * 办公电话话单查询
 * @apiName biz.conference.getCloudCallInfo
 * @supportVersion ios: 6.0.0 android: 6.0.0 pc: 6.0.9
 * @author Android：洛洋, iOS：度尽, pc：远觉
 */
export declare function getCloudCallInfo$(params: IBizConferenceGetCloudCallInfoParams): Promise<IBizConferenceGetCloudCallInfoResult>;
export default getCloudCallInfo$;
