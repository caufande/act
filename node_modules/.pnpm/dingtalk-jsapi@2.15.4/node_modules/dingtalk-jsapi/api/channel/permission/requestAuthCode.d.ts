/**
 * 服务窗请求授权码，免登改造用 请求参数定义
 * @apiName channel.permission.requestAuthCode
 */
export interface IChannelPermissionRequestAuthCodeParams {
    corpId: string;
}
/**
 * 服务窗请求授权码，免登改造用 返回结果定义
 * @apiName channel.permission.requestAuthCode
 */
export interface IChannelPermissionRequestAuthCodeResult {
    code: string;
}
/**
 * 服务窗请求授权码，免登改造用
 * @apiName channel.permission.requestAuthCode
 * @supportVersion  ios: 3.0.0 android: 3.0.0
 */
export declare function requestAuthCode$(params: IChannelPermissionRequestAuthCodeParams): Promise<IChannelPermissionRequestAuthCodeResult>;
export default requestAuthCode$;
