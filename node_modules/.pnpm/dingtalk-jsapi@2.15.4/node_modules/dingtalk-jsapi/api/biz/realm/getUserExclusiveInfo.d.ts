/**
 * 专属钉钉获取用户信息 请求参数定义
 * @apiName biz.realm.getUserExclusiveInfo
 */
export interface IBizRealmGetUserExclusiveInfoParams {
}
/**
 * 专属钉钉获取用户信息 返回结果定义
 * @apiName biz.realm.getUserExclusiveInfo
 */
export interface IBizRealmGetUserExclusiveInfoResult {
    /** 0：标准包;1：专属包 */
    isExclusiveApp: number;
}
/**
 * 专属钉钉获取用户信息
 * @apiName biz.realm.getUserExclusiveInfo
 * @supportVersion ios: 6.0.14 android: 6.0.14
 * @author Android：晤歌; iOS：路客; winodows： 秋酷
 */
export declare function getUserExclusiveInfo$(params: IBizRealmGetUserExclusiveInfoParams): Promise<IBizRealmGetUserExclusiveInfoResult>;
export default getUserExclusiveInfo$;
