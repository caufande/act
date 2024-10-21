/**
 * 打开系统设置 请求参数定义
 * @apiName device.base.openSystemSetting
 */
export interface IDeviceBaseOpenSystemSettingParams {
    /** Android系统中action的概念，如android.settings.BLUETOOTH_SETTINGS打开蓝牙设置页面 */
    action?: string;
    /** Android系统中跳转系统应用所需的参数 */
    param?: string;
    /** Android系统中跳转系统应用所需的data参数 */
    data?: string;
}
/**
 * 打开系统设置 返回结果定义
 * @apiName device.base.openSystemSetting
 */
export interface IDeviceBaseOpenSystemSettingResult {
}
/**
 * 打开系统设置
 * @apiName device.base.openSystemSetting
 * @supportVersion android: 6.0.27 ios: 6.3.15
 * @author Android：序望 iOS：轻罗
 */
export declare function openSystemSetting$(params: IDeviceBaseOpenSystemSettingParams): Promise<IDeviceBaseOpenSystemSettingResult>;
export default openSystemSetting$;
