/**
 * 获取wifi是否打开 请求参数定义
 * @apiName device.base.getWifiStatus
 */
export interface IDeviceBaseGetWifiStatusParams {
}
/**
 * 获取wifi是否打开 返回结果定义
 * @apiName device.base.getWifiStatus
 */
export interface IDeviceBaseGetWifiStatusResult {
    /** 当前连接wifi的状态  1 ：enable；0 : disable */
    status: 1 | 0;
}
/**
 * 获取wifi是否打开
 * @apiName device.base.getWifiStatus
 * @supportVersion  ios: 2.11.0 android: 2.11.0
 */
export declare function getWifiStatus$(params: IDeviceBaseGetWifiStatusParams): Promise<IDeviceBaseGetWifiStatusResult>;
export default getWifiStatus$;
