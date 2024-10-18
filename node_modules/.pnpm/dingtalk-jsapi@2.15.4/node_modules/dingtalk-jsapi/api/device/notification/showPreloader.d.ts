/**
 * 显示浮层 请求参数定义
 * @apiName device.notification.showPreloader
 */
export interface IDeviceNotificationShowPreloaderParams {
    /** loading显示的字符，空表示不显示文字 */
    text?: string;
    /** 是否显示icon，默认true */
    showIcon?: boolean;
}
/**
 * 显示浮层 返回结果定义
 * @apiName device.notification.showPreloader
 */
export interface IDeviceNotificationShowPreloaderResult {
}
/**
 * 显示浮层
 * （显示浮层，请和hidePreloader配对使用）
 * @apiName device.notification.showPreloader
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function showPreloader$(params: IDeviceNotificationShowPreloaderParams): Promise<IDeviceNotificationShowPreloaderResult>;
export default showPreloader$;
