/**
 * 获取当前登录用户信息 请求参数定义
 * @apiName biz.user.get
 */
export interface IBizUserGetParams {
    /** 是否允许无组织用户 （4.6.37以上版本支持） */
    allowNoOrgUser?: boolean;
    [key: string]: any;
}
/**
 * 获取当前登录用户信息 返回结果定义
 * @apiName biz.user.get
 */
export interface IBizUserGetResult {
    [key: string]: any;
}
/**
 * 获取当前登录用户信息
 * @apiName biz.user.get
 * @supportVersion  pc: 3.0.0 ios: 2.4.0 android: 2.4.0
 */
export declare function get$(params: IBizUserGetParams): Promise<IBizUserGetResult>;
export default get$;
