/**
 * 检测应用是否安装 请求参数定义
 * @apiName device.launcher.checkInstalledApps
 */
export interface IDeviceLauncherCheckInstalledAppsParams {
    /** 你要检测的应用列表 iOS:应用scheme;Android:应用包名 */
    apps: string[];
}
/**
 * 检测应用是否安装 返回结果定义
 * @apiName device.launcher.checkInstalledApps
 */
export interface IDeviceLauncherCheckInstalledAppsResult {
    /** 安装过的应用列表 iOS:应用scheme;Android:应用包名 */
    installed: string[];
}
/**
 * 检测应用是否安装
 * iOS平台仅对iOS9之前的系统有效
 * @apiName device.launcher.checkInstalledApps
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function checkInstalledApps$(params: IDeviceLauncherCheckInstalledAppsParams): Promise<IDeviceLauncherCheckInstalledAppsResult>;
export default checkInstalledApps$;
