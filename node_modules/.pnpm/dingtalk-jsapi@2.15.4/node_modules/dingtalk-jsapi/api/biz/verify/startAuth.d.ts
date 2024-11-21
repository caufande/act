/**
 * 对用户进行人脸认证，判断是否与当前钉钉账号实名绑定的身份一致 请求参数定义
 * @apiName biz.verify.startAuth
 */
export interface IBizVerifyStartAuthParams {
    /** 对账单号，开发者输入，用于跟踪  */
    bizId: string;
    /** 认证方式，目前只支持 "byDingtalk" */
    authType: string;
    /** 用户信息 */
    userInfo?: {
        /** 姓名 */
        name: string;
        /** 身份证号 */
        IDCardNo: string;
    };
    [key: string]: any;
}
/**
 * 对用户进行人脸认证，判断是否与当前钉钉账号实名绑定的身份一致 返回结果定义
 * @apiName biz.verify.startAuth
 */
export interface IBizVerifyStartAuthResult {
    /** 认证通过时，返回的授权码，用于服务端确认认证结果 */
    tmpAuthCode: string;
}
/**
 * 对用户进行人脸认证，判断是否与当前钉钉账号实名绑定的身份一致
 * @apiName biz.verify.startAuth
 * @supportVersion ios: 4.5.21 android: 4.5.21
 */
export declare function startAuth$(params: IBizVerifyStartAuthParams): Promise<IBizVerifyStartAuthResult>;
export default startAuth$;
