/**
 * 关闭持续定位 请求参数定义
 * @apiName device.geolocation.stop
 */
export interface IDeviceGeolocationStopParams {
    /** 需要停止定位场景id */
    sceneId: string;
}
/**
 * 关闭持续定位 返回结果定义
 * @apiName device.geolocation.stop
 */
export interface IDeviceGeolocationStopResult {
    /** 停止的定位场景id，或者null */
    sceneId: string;
}
/**
 * 关闭持续定位
 * @apiName device.geolocation.stop
 * @supportVersion  ios: 3.4.7 android: 3.4.7
 */
export declare function stop$(params: IDeviceGeolocationStopParams): Promise<IDeviceGeolocationStopResult>;
export default stop$;
