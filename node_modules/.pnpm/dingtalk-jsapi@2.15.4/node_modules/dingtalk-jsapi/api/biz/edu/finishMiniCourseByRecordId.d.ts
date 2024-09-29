/**
 * 标记微课完成 请求参数定义
 * @apiName biz.edu.finishMiniCourseByRecordId
 */
export interface IBizEduFinishMiniCourseByRecordIdParams {
    /** 记录的Id */
    recordId?: string;
}
/**
 * 标记微课完成 返回结果定义
 * @apiName biz.edu.finishMiniCourseByRecordId
 */
export interface IBizEduFinishMiniCourseByRecordIdResult {
    /** 1为成功，0位失败 */
    success: number;
}
/**
 * 标记微课完成
 * @apiName biz.edu.finishMiniCourseByRecordId
 * @supportVersion ios: 6.0.15 android: 6.0.15
 */
export declare function finishMiniCourseByRecordId$(params: IBizEduFinishMiniCourseByRecordIdParams): Promise<IBizEduFinishMiniCourseByRecordIdResult>;
export default finishMiniCourseByRecordId$;
