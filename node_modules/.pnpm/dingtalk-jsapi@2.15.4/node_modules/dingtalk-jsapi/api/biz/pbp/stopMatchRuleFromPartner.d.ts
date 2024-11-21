/**
 * 停止匹配打卡规则 请求参数定义
 * @apiName biz.pbp.stopMatchRuleFromPartner
 */
export interface IBizPbpStopMatchRuleFromPartnerParams {
    /** 业务实例唯一标识 */
    bizInstId: string;
}
/**
 * 停止匹配打卡规则 返回结果定义
 * @apiName biz.pbp.stopMatchRuleFromPartner
 */
export interface IBizPbpStopMatchRuleFromPartnerResult {
}
/**
 * 停止匹配打卡规则
 * @apiName biz.pbp.stopMatchRuleFromPartner
 * @supportVersion ios: 5.1.10 android: 5.1.10
 * @author Android；序望，iOS：度尽
 */
export declare function stopMatchRuleFromPartner$(params: IBizPbpStopMatchRuleFromPartnerParams): Promise<IBizPbpStopMatchRuleFromPartnerResult>;
export default stopMatchRuleFromPartner$;
