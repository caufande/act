/**
 * 专属包停止实时定位 请求参数定义
 * @apiName biz.realm.stopRealtimeTracing
 */
export interface IBizRealmStopRealtimeTracingParams {
}
/**
 * 专属包停止实时定位 返回结果定义
 * @apiName biz.realm.stopRealtimeTracing
 */
export interface IBizRealmStopRealtimeTracingResult {
    /** 定位任务关闭状态 */
    isTaskStopped: boolean;
    /** 结果代码 */
    resultCode: string;
    /** 结果信息 */
    resultMsg: string;
}
/**
 * 专属包停止实时定位
 * @apiName biz.realm.stopRealtimeTracing
 * @supportVersion android: 6.0.13
 * @author Android：晤歌
 */
export declare function stopRealtimeTracing$(params: IBizRealmStopRealtimeTracingParams): Promise<IBizRealmStopRealtimeTracingResult>;
export default stopRealtimeTracing$;
