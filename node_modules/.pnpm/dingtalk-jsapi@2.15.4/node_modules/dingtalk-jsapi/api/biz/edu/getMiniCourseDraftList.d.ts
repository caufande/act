/**
 * 获取微课草稿列表 请求参数定义
 * @apiName biz.edu.getMiniCourseDraftList
 */
export interface IBizEduGetMiniCourseDraftListParams {
}
/**
 * 获取微课草稿列表 返回结果定义
 * @apiName biz.edu.getMiniCourseDraftList
 */
export interface IBizEduGetMiniCourseDraftListResult {
    [key: string]: any;
}
/**
 * 获取微课草稿列表
 * @apiName biz.edu.getMiniCourseDraftList
 * @supportVersion ios: 6.0.15 android: 6.0.15
 * @author Android：景松 iOS：景松 教育线：林谦、楠者
 */
export declare function getMiniCourseDraftList$(params: IBizEduGetMiniCourseDraftListParams): Promise<IBizEduGetMiniCourseDraftListResult>;
export default getMiniCourseDraftList$;
