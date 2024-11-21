/**
 * iOS11系统数上，支持从H5端，动态调整调整webview的contentInsetAdjustmentBehavior。影响iPhone X等场景H5页面布局与安全区域 请求参数定义
 * @apiName device.screen.insetAdjust
 */
export interface IDeviceScreenInsetAdjustParams {
    /** 0-自动(默认); 1-特殊case, JsApi场景同0; 2-不自动适配安全区域，全屏布局； 3-自动适配安全区域 */
    contentInsetAdjustmentBehavior: number;
}
/**
 * iOS11系统数上，支持从H5端，动态调整调整webview的contentInsetAdjustmentBehavior。影响iPhone X等场景H5页面布局与安全区域 返回结果定义
 * @apiName device.screen.insetAdjust
 */
export interface IDeviceScreenInsetAdjustResult {
    [key: string]: any;
}
/**
 * iOS11系统数上，支持从H5端，动态调整调整webview的contentInsetAdjustmentBehavior。影响iPhone X等场景H5页面布局与安全区域
 * @apiName device.screen.insetAdjust
 * @supportVersion ios: 4.6.18
 */
export declare function insetAdjust$(params: IDeviceScreenInsetAdjustParams): Promise<IDeviceScreenInsetAdjustResult>;
export default insetAdjust$;
