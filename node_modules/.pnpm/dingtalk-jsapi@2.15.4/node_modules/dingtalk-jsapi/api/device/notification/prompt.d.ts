/**
 * 弹窗prompt 请求参数定义
 * @apiName device.notification.prompt
 */
export interface IDeviceNotificationPromptParams {
    /** 消息内容 */
    message: string;
    /** 标题 */
    title?: string;
    /** 默认提示 */
    defaultText?: string;
    /** 按钮名称 */
    buttonLabels?: string[];
}
/**
 * 弹窗prompt 返回结果定义
 * @apiName device.notification.prompt
 */
export interface IDeviceNotificationPromptResult {
    /** 被点击按钮的索引值，Number类型，从0开始 */
    buttonIndex: number;
    /** 输入的值 */
    value: string;
}
/**
 * 弹窗prompt
 * @apiName device.notification.prompt
 * @supportVersion  pc: 2.7.0 ios: 2.4.0 android: 2.4.0
 */
export declare function prompt$(params: IDeviceNotificationPromptParams): Promise<IDeviceNotificationPromptResult>;
export default prompt$;
