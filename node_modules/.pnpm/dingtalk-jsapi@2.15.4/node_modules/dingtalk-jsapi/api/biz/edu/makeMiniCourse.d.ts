/**
 * 创建一个微课 请求参数定义
 * @apiName biz.edu.makeMiniCourse
 */
export interface IBizEduMakeMiniCourseParams {
    /** 记录的Id */
    recordId?: string;
    /** 会话的ID */
    chatId?: string;
    /** 话题 */
    topic?: string;
    /** 环境参数 */
    env?: string;
    /** 必须是Encode过的string */
    extData?: string;
}
/**
 * 创建一个微课 返回结果定义
 * @apiName biz.edu.makeMiniCourse
 */
export interface IBizEduMakeMiniCourseResult {
}
/**
 * 创建一个微课
 * @apiName biz.edu.makeMiniCourse
 * @supportVersion ios: 6.0.15 android: 6.0.15
 * @author Android：景松 iOS：景松 教育线：林谦、楠者
 */
export declare function makeMiniCourse$(params: IBizEduMakeMiniCourseParams): Promise<IBizEduMakeMiniCourseResult>;
export default makeMiniCourse$;
