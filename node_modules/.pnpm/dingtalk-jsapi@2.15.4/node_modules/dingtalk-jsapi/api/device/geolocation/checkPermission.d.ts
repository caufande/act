/**
 * 检查当前系统是否给钉钉授予定位权限 请求参数定义
 * @apiName device.geolocation.checkPermission
 */
export interface IDeviceGeolocationCheckPermissionParams {
}
/**
 * 检查当前系统是否给钉钉授予定位权限 返回结果定义
 * @apiName device.geolocation.checkPermission
 */
export interface IDeviceGeolocationCheckPermissionResult {
    hasPermission: boolean;
}
/**
 * 检查当前系统是否给钉钉授予定位权限
 * @apiName device.geolocation.checkPermission
 * @supportVersion android: 4.5.0
 * @author android:珑一
 */
export declare function checkPermission$(params: IDeviceGeolocationCheckPermissionParams): Promise<IDeviceGeolocationCheckPermissionResult>;
export default checkPermission$;
