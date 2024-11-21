/**
 * 获取热点接入信息 请求参数定义
 * @apiName device.base.getInterface
 */
export interface IDeviceBaseGetInterfaceParams {
}
/**
 * 获取热点接入信息 返回结果定义
 * @apiName device.base.getInterface
 */
export interface IDeviceBaseGetInterfaceResult {
    /** 热点ssid */
    ssid: string;
    /** 热点mac地址 */
    macIp: string;
}
/**
 * 获取热点接入信息
 * @apiName device.base.getInterface
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function getInterface$(params: IDeviceBaseGetInterfaceParams): Promise<IDeviceBaseGetInterfaceResult>;
export default getInterface$;
