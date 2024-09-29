/**
 *  请求参数定义
 * @apiName runtime.permission.requestOperateAuthCode
 */
export interface IRuntimePermissionRequestOperateAuthCodeParams {
    /** 企业ID */
    corpId: string;
    /** 微应用ID，必须与dd.config的一致 */
    agentId: string;
}
/**
 *  返回结果定义
 * @apiName runtime.permission.requestOperateAuthCode
 */
export interface IRuntimePermissionRequestOperateAuthCodeResult {
    code: string;
}
/**
 * 获取微应用反馈式操作的临时授权码
 * @apiName runtime.permission.requestOperateAuthCode
 * @supportVersion  pc: 3.3.0 ios: 3.3.0 android: 3.3.0
 */
export declare function requestOperateAuthCode$(params: IRuntimePermissionRequestOperateAuthCodeParams): Promise<IRuntimePermissionRequestOperateAuthCodeResult>;
export default requestOperateAuthCode$;
