/**
 * 获取通用唯一识别码（卸载重新安装会改变） 请求参数定义
 * @apiName device.base.getUUID
 */
export interface IDeviceBaseGetUUIDParams {
}
/**
 * 获取通用唯一识别码（卸载重新安装会改变） 返回结果定义
 * @apiName device.base.getUUID
 */
export interface IDeviceBaseGetUUIDResult {
    /** 通用唯一识别码 */
    uuid: string;
}
/**
 * 获取通用唯一识别码（卸载重新安装会改变）
 * @apiName device.base.getUUID
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function getUUID$(params: IDeviceBaseGetUUIDParams): Promise<IDeviceBaseGetUUIDResult>;
export default getUUID$;
