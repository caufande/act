/**
 * 获取当前网络类型 请求参数定义
 * @apiName device.connection.getNetworkType
 */
export interface IDeviceConnectionGetNetworkTypeParams {
}
/**
 * 获取当前网络类型 返回结果定义
 * @apiName device.connection.getNetworkType
 */
export interface IDeviceConnectionGetNetworkTypeResult {
    /** result值: wifi 2g 3g 4g unknown none   none表示离线 */
    result: 'wifi' | '2g' | '3g' | '4g' | 'unknown' | 'none';
}
/**
 * 获取当前网络类型
 * @apiName device.connection.getNetworkType
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function getNetworkType$(params: IDeviceConnectionGetNetworkTypeParams): Promise<IDeviceConnectionGetNetworkTypeResult>;
export default getNetworkType$;
