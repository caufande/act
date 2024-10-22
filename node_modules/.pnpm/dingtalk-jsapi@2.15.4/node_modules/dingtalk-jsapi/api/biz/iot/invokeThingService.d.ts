/**
 * 调用iot物模型服务 请求参数定义
 * @apiName biz.iot.invokeThingService
 */
export interface IBizIotInvokeThingServiceParams {
    /** 设备的id */
    deviceId: string;
    /** 设备所在的server id */
    devServerId: number;
    /** 要设置属性集合的json string */
    params: string;
}
/**
 * 调用iot物模型服务 返回结果定义
 * @apiName biz.iot.invokeThingService
 */
export interface IBizIotInvokeThingServiceResult {
    property: string;
}
/**
 * 调用iot物模型服务
 * @apiName biz.iot.invokeThingService
 * @supportVersion ios: 4.6.42 android: 4.6.42
 */
export declare function invokeThingService$(params: IBizIotInvokeThingServiceParams): Promise<IBizIotInvokeThingServiceResult>;
export default invokeThingService$;
