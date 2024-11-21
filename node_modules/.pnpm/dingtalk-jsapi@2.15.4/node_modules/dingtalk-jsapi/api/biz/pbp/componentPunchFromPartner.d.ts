/**
 * 组件打卡开放接口，前置调用位置匹配接口，此接口只提供给ISV运行期间内的多次相同入参调用会被拒绝 请求参数定义
 * @apiName biz.pbp.componentPunchFromPartner
 */
export interface IBizPbpComponentPunchFromPartnerParams {
    /** 业务实例唯一标识 */
    bizInstId: string;
    /** 业务code */
    bizCode: string;
    /** 由匹配打卡规则获取到的sessionId */
    positionSessionId?: string;
    /** 由调用人脸组件获取到的sessionId，本期暂不支持，因此positionSessionId必填 */
    faceSessionId?: string;
    /** 最长1024个字节 该数据会透传给业务系统，打卡成功后，会将业务系统推送结果进行透传。建议可以传入标识唯一性的id用作上下文处理等 */
    extension?: string;
}
/**
 * 组件打卡开放接口，前置调用位置匹配接口，此接口只提供给ISV运行期间内的多次相同入参调用会被拒绝 返回结果定义
 * @apiName biz.pbp.componentPunchFromPartner
 */
export interface IBizPbpComponentPunchFromPartnerResult {
    /** 是否成功 */
    success: boolean;
    /** 接口错误码 */
    code: string;
    /** 接口错误信息 */
    message: string;
    /** 推送事件
     * "pbp_punch_result"：打卡平台打卡结果
     * "biz_punch_result": 业务系统打卡结果
     **/
    event: string;
    /** 推送数据，如果为业务系统打卡结果，数据结构由业务方自己定义 为打卡平台打卡结果时，需要自己做反序列化 */
    data: string;
}
/**
 * 组件打卡开放接口，前置调用位置匹配接口，此接口只提供给ISV运行期间内的多次相同入参调用会被拒绝
 * @apiName biz.pbp.componentPunchFromPartner
 * @supportVersion ios: 5.1.10 android: 5.1.10
 * @author Android：序望，iOS：度尽
 */
export declare function componentPunchFromPartner$(params: IBizPbpComponentPunchFromPartnerParams): Promise<IBizPbpComponentPunchFromPartnerResult>;
export default componentPunchFromPartner$;
