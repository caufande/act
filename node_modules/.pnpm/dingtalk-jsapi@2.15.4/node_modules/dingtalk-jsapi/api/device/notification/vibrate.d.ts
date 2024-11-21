/**
 * 震动 请求参数定义
 * @apiName device.notification.vibrate
 */
export interface IDeviceNotificationVibrateParams {
    /** 震动时间，android可配置 iOS忽略 */
    duration?: number;
}
/**
 * 震动 返回结果定义
 * @apiName device.notification.vibrate
 */
export interface IDeviceNotificationVibrateResult {
}
/**
 * 震动
 * @apiName device.notification.vibrate
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function vibrate$(params: IDeviceNotificationVibrateParams): Promise<IDeviceNotificationVibrateResult>;
export default vibrate$;
