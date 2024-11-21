/**
 * 设置规则 请求参数定义
 * @apiName biz.contact.setRule
 */
export interface IBizContactSetRuleParams {
    [key: string]: any;
}
/**
 * 设置规则 返回结果定义
 * @apiName biz.contact.setRule
 */
export interface IBizContactSetRuleResult {
    [key: string]: any;
}
/**
 * 设置规则
 * @apiName biz.contact.setRule
 * @supportVersion  ios: 2.15 android: 2.15
 */
export declare function setRule$(params: IBizContactSetRuleParams): Promise<IBizContactSetRuleResult>;
export default setRule$;
