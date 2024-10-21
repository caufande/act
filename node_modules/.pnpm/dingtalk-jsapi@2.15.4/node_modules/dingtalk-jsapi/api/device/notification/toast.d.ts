/**
 * Toast 请求参数定义
 * @apiName device.notification.toast
 */
export interface IDeviceNotificationToastParams {
    /** 移动端 icon样式，有success和error，默认为空 0.0.2， PC端参数则代表样式类型 */
    icon?: 'success' | 'error';
    /** @deprecated PC端参数特有 toast的类型 alert, success, error, warning, information, confirm */
    type?: 'alert' | 'success' | 'error' | 'warning' | 'information';
    /** 提示信息 */
    text?: string;
    /** 显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)] */
    duration?: number;
    /** 延迟显示，单位秒，默认0 */
    delay?: number;
}
/**
 * Toast 返回结果定义
 * @apiName device.notification.toast
 */
export interface IDeviceNotificationToastResult {
}
/**
 * Toast
 * @apiName device.notification.toast
 * @supportVersion  pc: 2.5.0 ios: 2.4.0 android: 2.4.0
 */
export declare function toast$(params: IDeviceNotificationToastParams): Promise<IDeviceNotificationToastResult>;
export default toast$;
