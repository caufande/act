/**
 * 获取手机基础信息 请求参数定义
 * @apiName device.base.getPhoneInfo
 */
export interface IDeviceBaseGetPhoneInfoParams {
}
/**
 * 获取手机基础信息 返回结果定义
 * @apiName device.base.getPhoneInfo
 */
export interface IDeviceBaseGetPhoneInfoResult {
    /** 手机屏幕宽度 */
    screenWidth: number;
    /** 手机屏幕高度 */
    screenHeight: number;
    /** 手机品牌 */
    brand: string;
    /** 手机型号 */
    model: string;
    /** 版本 */
    version: string;
    /** 网络类型 wifi／4g／3g   */
    netInfo: 'wifi' | '4g' | '3g';
    /** 运营商信息 */
    operatorType: string;
}
/**
 * 获取手机基础信息
 * @apiName device.base.getPhoneInfo
 * @supportVersion  ios: 3.5.0 android: 3.5.0
 */
export declare function getPhoneInfo$(params: IDeviceBaseGetPhoneInfoParams): Promise<IDeviceBaseGetPhoneInfoResult>;
export default getPhoneInfo$;
