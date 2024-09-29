/**
 * 隐藏浮层 请求参数定义
 * @apiName device.notification.hidePreloader
 */
export interface IDeviceNotificationHidePreloaderParams {
}
/**
 * 隐藏浮层 返回结果定义
 * @apiName device.notification.hidePreloader
 */
export interface IDeviceNotificationHidePreloaderResult {
}
/**
 * 隐藏浮层
 * @apiName device.notification.hidePreloader
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function hidePreloader$(params: IDeviceNotificationHidePreloaderParams): Promise<IDeviceNotificationHidePreloaderResult>;
export default hidePreloader$;
