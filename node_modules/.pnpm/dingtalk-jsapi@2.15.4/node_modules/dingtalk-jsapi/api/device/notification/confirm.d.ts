/**
 * 弹窗confirm 请求参数定义
 * @apiName device.notification.confirm
 */
export interface IDeviceNotificationConfirmParams {
    /** 消息说明 */
    message?: string;
    /** 标题 */
    title?: string;
    /** 按钮名称 */
    buttonLabels?: string[];
}
/**
 * 弹窗confirm 返回结果定义
 * @apiName device.notification.confirm
 */
export interface IDeviceNotificationConfirmResult {
    /** 被点击按钮的索引值，Number类型，从0开始 */
    buttonIndex: number;
}
/**
 * 弹窗confirm
 * @apiName device.notification.confirm
 * @supportVersion  pc: 2.5.0 ios: 2.4.0 android: 2.4.0
 */
export declare function confirm$(params: IDeviceNotificationConfirmParams): Promise<IDeviceNotificationConfirmResult>;
export default confirm$;
