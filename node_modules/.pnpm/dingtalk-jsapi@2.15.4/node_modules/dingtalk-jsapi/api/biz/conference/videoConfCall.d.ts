/**
 * 向组织内用户发起视频会议 请求参数定义
 * @apiName biz.conference.videoConfCall
 */
export interface IBizConferenceVideoConfCallParams {
    /** 通话主题，建议传入有实际意义的简短描述，便于之后查看通话记录时快速筛选。 */
    title: string;
    /** 被叫的所属企业id */
    calleeCorpId: string;
    /** 参会人在所属企业中的 staff-id列表，注意，这里的 StaffId 必须归属于上面的 calleeCorpId 对应的企业 */
    calleeStaffIds: string[];
}
/**
 * 向组织内用户发起视频会议 返回结果定义
 * @apiName biz.conference.videoConfCall
 */
export interface IBizConferenceVideoConfCallResult {
}
/**
 * 向组织内用户发起视频会议
 * @apiName biz.conference.videoConfCall
 * @supportVersion ios: 5.0.8 android: 5.0.8 pc: 5.1.28
 * @author iOS: 怒龙, android: 柳樵 windows: 桓奇 Mac：远觉
 */
export declare function videoConfCall$(params: IBizConferenceVideoConfCallParams): Promise<IBizConferenceVideoConfCallResult>;
export default videoConfCall$;
