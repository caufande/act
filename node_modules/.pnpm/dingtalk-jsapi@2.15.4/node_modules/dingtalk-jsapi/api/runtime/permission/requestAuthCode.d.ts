/**
 * 请求授权码，免登改造用 请求参数定义
 * 调用此api不需要进行鉴权（即不需要进行dd.config）
 * @apiName runtime.permission.requestAuthCode
 */
export interface IRuntimePermissionRequestAuthCodeParams {
    /** 企业ID */
    corpId: string;
}
/**
 * 请求授权码，免登改造用 返回结果定义
 * @apiName runtime.permission.requestAuthCode
 */
export interface IRuntimePermissionRequestAuthCodeResult {
    /** 授权码，5分钟有效，且只能使用一次 */
    code: string;
}
/**
 * 请求授权码，免登改造用
 * @apiName runtime.permission.requestAuthCode
 * @supportVersion  pc: 3.0.0 ios: 2.4.0 android: 2.4.0
 */
export declare function requestAuthCode$(params: IRuntimePermissionRequestAuthCodeParams): Promise<IRuntimePermissionRequestAuthCodeResult>;
export default requestAuthCode$;
