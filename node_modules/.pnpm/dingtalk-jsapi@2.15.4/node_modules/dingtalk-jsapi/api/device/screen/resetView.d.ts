/**
 * 重置旋转状态，并在恢复导航栏 请求参数定义
 * @apiName device.screen.resetView
 */
export interface IDeviceScreenResetViewParams {
    [key: string]: any;
}
/**
 * 重置旋转状态，并在恢复导航栏 返回结果定义
 * @apiName device.screen.resetView
 */
export interface IDeviceScreenResetViewResult {
    [key: string]: any;
}
/**
 * 重置旋转状态，并在恢复导航栏
 * @apiName device.screen.resetView
 * @supportVersion  android: 4.0
 */
export declare function resetView$(params: IDeviceScreenResetViewParams): Promise<IDeviceScreenResetViewResult>;
export default resetView$;
