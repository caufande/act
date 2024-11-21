/**
 * 加入在线课堂专业版 请求参数定义
 * @apiName biz.edu.joinClassroom
 */
export interface IBizEduJoinClassroomParams {
    /** 加入课堂的参数，该值需要调用开放接口获取； */
    classroomId: string;
}
/**
 * 加入在线课堂专业版 返回结果定义
 * @apiName biz.edu.joinClassroom
 */
export interface IBizEduJoinClassroomResult {
}
/**
 * 加入在线课堂专业版
 * @apiName biz.edu.joinClassroom
 * @supportVersion ios: 6.0.15 android: 6.0.15 pc: 6.0.15
 * @author Android：序望 iOS：橙希 Windows：砺之 教育线：林谦、楠者
 */
export declare function joinClassroom$(params: IBizEduJoinClassroomParams): Promise<IBizEduJoinClassroomResult>;
export default joinClassroom$;
