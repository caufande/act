/**
 * 修改企业通讯录选人 请求参数定义
 * @apiName biz.contact.choose
 */
export interface IBizContactChooseParams {
    [key: string]: any;
}
/**
 * 修改企业通讯录选人 返回结果定义
 * @apiName biz.contact.choose
 */
export interface IBizContactChooseResult {
    [key: string]: any;
}
/**
 * 修改企业通讯录选人
 * @apiName biz.contact.choose
 * @supportVersion  pc: 2.5.0 ios: 2.4.0 android: 2.4.0
 */
export declare function choose$(params: IBizContactChooseParams): Promise<IBizContactChooseResult>;
export default choose$;
