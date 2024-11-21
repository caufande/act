/**
 * 批量查询持续定位JS-API状态 请求参数定义
 * @apiName device.geolocation.status
 */
export interface IDeviceGeolocationStatusParams {
    /** 需要查询定位场景id列表 */
    sceneIds: string[];
}
/**
 * 批量查询持续定位JS-API状态 返回结果定义
 * 返回的值是一个数组，每一个元素为一个map，标志了一个定位场景的状态。map的key为场景id，value为其对应的状态
 * @apiName device.geolocation.status
 */
export declare type IDeviceGeolocationStatusResult = Array<{
    /**  场景id以及对应的开启状态，1 表示正在持续定位， 0 表示未开始持续 */
    [sceneId: string]: 0 | 1;
}>;
/**
 * 批量查询持续定位JS-API状态
 * @apiName device.geolocation.status
 * @supportVersion  ios: 3.4.8 android: 3.4.8
 */
export declare function status$(params: IDeviceGeolocationStatusParams): Promise<IDeviceGeolocationStatusResult>;
export default status$;
