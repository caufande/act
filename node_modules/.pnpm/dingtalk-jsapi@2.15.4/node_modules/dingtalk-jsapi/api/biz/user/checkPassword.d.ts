/**
 * 验证钉钉密码已验证当前用户是否当前钉钉账户持有人 请求参数定义
 * @apiName biz.user.checkPassword
 */
export interface IBizUserCheckPasswordParams {
    [key: string]: any;
}
/**
 * 验证钉钉密码已验证当前用户是否当前钉钉账户持有人 返回结果定义
 * @apiName biz.user.checkPassword
 */
export interface IBizUserCheckPasswordResult {
    /** 结果，int （1 success，2 fail） */
    result: number;
}
/**
 * 验证钉钉密码已验证当前用户是否当前钉钉账户持有人
 * @apiName biz.user.checkPassword
 * @supportVersion ios: 4.5.8 android: 4.5.8
 */
export declare function checkPassword$(params: IBizUserCheckPasswordParams): Promise<IBizUserCheckPasswordResult>;
export default checkPassword$;
