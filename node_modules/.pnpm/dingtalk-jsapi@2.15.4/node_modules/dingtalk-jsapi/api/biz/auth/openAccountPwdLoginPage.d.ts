/**
 * 跳账密登录页 请求参数定义
 * @apiName biz.auth.openAccountPwdLoginPage
 */
export interface IBizAuthOpenAccountPwdLoginPageParams {
    [key: string]: any;
}
/**
 * 跳账密登录页 返回结果定义
 * @apiName biz.auth.openAccountPwdLoginPage
 */
export interface IBizAuthOpenAccountPwdLoginPageResult {
    [key: string]: any;
}
/**
 * 跳账密登录页
 * @apiName biz.auth.openAccountPwdLoginPage
 * @supportVersion ios: 6.3.0 android: 6.3.0
 * @author Android @启宏 iOS @姚曦
 */
export declare function openAccountPwdLoginPage$(params: IBizAuthOpenAccountPwdLoginPageParams): Promise<IBizAuthOpenAccountPwdLoginPageResult>;
export default openAccountPwdLoginPage$;
