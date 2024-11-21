/**
 * 对北京政务通版本增加一个登录内网的能力 请求参数定义
 * @apiName net.bjGovApn.loginGovNet
 */
export interface INetBjGovApnLoginGovNetParams {
    /** 用户名，必填 */
    userName: string;
    /** 密码 */
    password: string;
}
/**
 * 对北京政务通版本增加一个登录内网的能力 返回结果定义
 * @apiName net.bjGovApn.loginGovNet
 */
export interface INetBjGovApnLoginGovNetResult {
    result: string;
}
/**
 * 对北京政务通版本增加一个登录内网的能力
 * @apiName net.bjGovApn.loginGovNet
 * @supportVersion android: 4.5.16
 */
export declare function loginGovNet$(params: INetBjGovApnLoginGovNetParams): Promise<INetBjGovApnLoginGovNetResult>;
export default loginGovNet$;
