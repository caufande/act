/**
 * 专属包实时定位任务状态查询 请求参数定义
 * @apiName biz.realm.getRealtimeTracingStatus
 */
export interface IBizRealmGetRealtimeTracingStatusParams {
}
/**
 * 专属包实时定位任务状态查询 返回结果定义
 * @apiName biz.realm.getRealtimeTracingStatus
 */
export interface IBizRealmGetRealtimeTracingStatusResult {
    /** 巡检任务状态 */
    isTraceRunning: boolean;
    /** 巡检位置数据上报周期 */
    reportPeriod: number;
    /** 巡检位置数据获取周期 */
    collectPeriod: number;
}
/**
 * 专属包实时定位任务状态查询
 * @apiName biz.realm.getRealtimeTracingStatus
 * @supportVersion android: 6.0.13
 * @author Android：晤歌
 */
export declare function getRealtimeTracingStatus$(params: IBizRealmGetRealtimeTracingStatusParams): Promise<IBizRealmGetRealtimeTracingStatusResult>;
export default getRealtimeTracingStatus$;
