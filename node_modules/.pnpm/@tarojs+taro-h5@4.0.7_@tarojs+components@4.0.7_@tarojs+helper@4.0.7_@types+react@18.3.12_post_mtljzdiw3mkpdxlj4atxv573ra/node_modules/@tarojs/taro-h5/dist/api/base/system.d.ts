import Taro from '@tarojs/api';
/** 跳转系统蓝牙设置页 */
declare const openSystemBluetoothSetting: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
/** 跳转系统微信授权管理页 */
declare const openAppAuthorizeSetting: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
/** 获取窗口信息 */
declare const getWindowInfo: typeof Taro.getWindowInfo;
/** 获取设备设置 */
declare const getSystemSetting: typeof Taro.getSystemSetting;
/** 获取设备设置 */
declare const getDeviceInfo: typeof Taro.getDeviceInfo;
/** 获取微信APP基础信息 */
declare const getAppBaseInfo: typeof Taro.getAppBaseInfo;
/** 获取微信APP授权设置 */
declare const getAppAuthorizeSetting: typeof Taro.getAppAuthorizeSetting;
/** 获取设备设置 */
declare const getSystemInfoSync: typeof Taro.getSystemInfoSync;
/** 获取系统信息 */
declare const getSystemInfoAsync: typeof Taro.getSystemInfoAsync;
/** 获取系统信息 */
declare const getSystemInfo: typeof Taro.getSystemInfo;
declare const getSkylineInfoSync: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
declare const getSkylineInfo: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
declare const getRendererUserAgent: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
export { openSystemBluetoothSetting, openAppAuthorizeSetting, getWindowInfo, getSystemSetting, getDeviceInfo, getAppBaseInfo, getAppAuthorizeSetting, getSystemInfoSync, getSystemInfoAsync, getSystemInfo, getSkylineInfoSync, getSkylineInfo, getRendererUserAgent };
