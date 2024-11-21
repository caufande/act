/**
 * ActionSheet控件 请求参数定义
 * @apiName device.notification.actionSheet
 */
export interface IDeviceNotificationActionSheetParams {
    /** 标题 */
    title: string;
    /** 取消按钮文本 */
    cancelButton: string;
    /** 其他按钮列表 */
    otherButtons: string[];
}
/**
 * ActionSheet控件 返回结果定义
 * @apiName device.notification.actionSheet
 */
export interface IDeviceNotificationActionSheetResult {
    /** 被点击按钮的索引值，Number，从0开始, 取消按钮为-1 */
    buttonIndex: number;
}
/**
 * ActionSheet控件 单选列表
 * @apiName device.notification.actionSheet
 * @supportVersion  pc: 3.0.0 ios: 2.4.0 android: 2.4.0
 */
export declare function actionSheet$(params: IDeviceNotificationActionSheetParams): Promise<IDeviceNotificationActionSheetResult>;
export default actionSheet$;
