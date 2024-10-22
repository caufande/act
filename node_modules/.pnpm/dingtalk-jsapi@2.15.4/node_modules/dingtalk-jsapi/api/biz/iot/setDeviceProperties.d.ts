/**
 * 智能硬件设置设备属性 请求参数定义
 * @apiName biz.iot.setDeviceProperties
 */
export interface IBizIotSetDevicePropertiesParams {
    /** 设备的id */
    deviceId: string;
    /** 设备所在的server id，产品id */
    devServerId: string;
    /** 要设置属性集合的json string(为属性的key, value集合) */
    property: string;
}
/**
 * 智能硬件设置设备属性 返回结果定义
 * @apiName biz.iot.setDeviceProperties
 */
export interface IBizIotSetDevicePropertiesResult {
}
/**
 * 智能硬件设置设备属性
 * @apiName biz.iot.setDeviceProperties
 * @supportVersion ios: 4.6.42 android: 4.6.42
 */
export declare function setDeviceProperties$(params: IBizIotSetDevicePropertiesParams): Promise<IBizIotSetDevicePropertiesResult>;
export default setDeviceProperties$;
