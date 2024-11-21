/**
 * 弹浮层 请求参数定义
 * @apiName device.notification.modal
 */
export interface IDeviceNotificationModalParams {
    /** 图片地址 */
    image?: string;
    /** 图片地址数组。此参数与image互斥，冲突时优先使用此参数。 */
    banner?: string[];
    /** 标题 */
    title?: string;
    /** 文本内容 */
    content?: string;
    /** 其他按钮列表 */
    buttonLabels?: string[];
}
/**
 * 弹浮层 返回结果定义
 * @apiName device.notification.modal
 */
export interface IDeviceNotificationModalResult {
    /** 被点击按钮的索引值，Number，从0开始 */
    buttonIndex: number;
}
/**
 * 弹浮层
 * @apiName device.notification.modal
 * @supportVersion  pc: 4.2.5 ios: 2.4.0 android: 2.4.0
 */
export declare function modal$(params: IDeviceNotificationModalParams): Promise<IDeviceNotificationModalResult>;
export default modal$;
