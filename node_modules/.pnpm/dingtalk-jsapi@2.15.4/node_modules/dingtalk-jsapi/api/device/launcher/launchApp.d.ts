/**
 * 启动第三方app 请求参数定义
 * @apiName device.launcher.launchApp
 */
export interface IDeviceLauncherLaunchAppParams {
    /** iOS:应用scheme;Android:应用包名 */
    app: string;
}
/**
 * 启动第三方app 返回结果定义
 * @apiName device.launcher.launchApp
 */
export interface IDeviceLauncherLaunchAppResult {
    /** 唤起状态: true 唤起成功 false 唤起失败 */
    result: boolean;
}
/**
 * 启动第三方app
 * @apiName device.launcher.launchApp
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function launchApp$(params: IDeviceLauncherLaunchAppParams): Promise<IDeviceLauncherLaunchAppResult>;
export default launchApp$;
