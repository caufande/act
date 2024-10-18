/**
 * 专属包开启实时定位 请求参数定义
 * @apiName biz.realm.startRealtimeTracing
 */
export interface IBizRealmStartRealtimeTracingParams {
}
/**
 * 专属包开启实时定位 返回结果定义
 * @apiName biz.realm.startRealtimeTracing
 */
export interface IBizRealmStartRealtimeTracingResult {
    /** 当前定位任务是否开启 */
    isStartSuccess: boolean;
    /** 定位收集周期 */
    collectPeriod: number;
    /** 定位上报周期 */
    reportPeriod: number;
    /** 结果代码 */
    resultCode: string;
    /** 结果信息 */
    resultMsg: string;
}
/**
 * 专属包开启实时定位
 * @apiName biz.realm.startRealtimeTracing
 * @supportVersion android: 6.0.13
 * @author Android：晤歌
 */
export declare function startRealtimeTracing$(params: IBizRealmStartRealtimeTracingParams): Promise<IBizRealmStartRealtimeTracingResult>;
export default startRealtimeTracing$;
