/**
 * 智能硬获取设备属性 请求参数定义
 * @apiName biz.iot.getDeviceProperties
 */
export interface IBizIotGetDevicePropertiesParams {
    /** 设备的id */
    deviceId: string;
    /** 设备所在的server id，产品id */
    devServerId: string;
}
/**
 * 智能硬获取设备属性 返回结果定义
 * @apiName biz.iot.getDeviceProperties
 */
export interface IBizIotGetDevicePropertiesResult {
    /** 设置属性集合的json string(为属性的key, value集合) */
    property: string;
}
/**
 * 智能硬获取设备属性
 * @apiName biz.iot.getDeviceProperties
 * @supportVersion ios: 4.6.42 android: 4.6.42
 */
export declare function getDeviceProperties$(params: IBizIotGetDevicePropertiesParams): Promise<IBizIotGetDevicePropertiesResult>;
export default getDeviceProperties$;
