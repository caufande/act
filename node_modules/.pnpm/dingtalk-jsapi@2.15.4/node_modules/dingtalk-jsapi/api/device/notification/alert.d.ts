/**
 * 弹窗alert 请求参数定义
 * @apiName device.notification.alert
 */
export interface IDeviceNotificationAlertParams {
    /** 消息内容 */
    message?: string;
    /** 弹窗标题 */
    title?: string;
    /** 按钮名称 */
    buttonName?: string;
}
/**
 * 弹窗alert 返回结果定义, 将在点击button之后触发
 * @apiName device.notification.alert
 */
export interface IDeviceNotificationAlertResult {
}
/**
 * 弹窗alert
 * @apiName device.notification.alert
 * @supportVersion  pc: 2.5.0 ios: 2.4.0 android: 2.4.0
 */
export declare function alert$(params: IDeviceNotificationAlertParams): Promise<IDeviceNotificationAlertResult>;
export default alert$;
