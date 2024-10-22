/**
 * 弹层，支持多张图片 请求参数定义
 * @apiName device.notification.extendModal
 */
export interface IDeviceNotificationExtendModalParams {
    /** 浮层元素数组，每一个item为一个包含image、title、content内容的对象 */
    cells: Array<{
        /** 图片地址 */
        image: string;
        /** 标题 */
        title: string;
        /** 文本内容 */
        content: string;
    }>;
    /**  最多两个按钮，至少有一个按钮。 */
    buttonLabels: string[];
}
/**
 * 弹层，支持多张图片 返回结果定义
 * @apiName device.notification.extendModal
 */
export interface IDeviceNotificationExtendModalResult {
    /** 被点击按钮的索引值，Number，从0开始 */
    buttonIndex: number;
}
/**
 * 弹层，支持多张图片
 * 增强版modal弹浮层，支持自定义每一个Cell的内容
 * @apiName device.notification.extendModal
 * @supportVersion  ios: 2.5.0 android: 2.5.0
 */
export declare function extendModal$(params: IDeviceNotificationExtendModalParams): Promise<IDeviceNotificationExtendModalResult>;
export default extendModal$;
