/**
 * 弹出授权弹窗，提示用户授权某些接口的权限 请求参数定义
 * @apiName biz.auth.requestAuthInfo
 */
export interface IBizAuthRequestAuthInfoParams {
    /** 授权类型： 0 企业通讯录授权范围 1 企业接口和字段权限 2 个人数据授权 */
    authorizeType: string;
}
/**
 * 弹出授权弹窗，提示用户授权某些接口的权限 返回结果定义
 * @apiName biz.auth.requestAuthInfo
 */
export interface IBizAuthRequestAuthInfoResult {
}
/**
 * 弹出授权弹窗，提示用户授权某些接口的权限
 * @apiName biz.auth.requestAuthInfo
 * @supportVersion ios: 5.1.19 android: 5.1.19
 * @author Android：煮虾 iOS：无最
 */
export declare function requestAuthInfo$(params: IBizAuthRequestAuthInfoParams): Promise<IBizAuthRequestAuthInfoResult>;
export default requestAuthInfo$;
