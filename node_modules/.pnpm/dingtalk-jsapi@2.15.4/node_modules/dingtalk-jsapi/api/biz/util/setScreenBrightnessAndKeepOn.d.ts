/**
 * 设置屏幕亮度和常亮 请求参数定义
 * @apiName biz.util.setScreenBrightnessAndKeepOn
 */
export interface IBizUtilSetScreenBrightnessAndKeepOnParams {
    /** 屏幕亮度，支持 0.1～1.0 范围内的值 */
    brightness: number;
    /** true(常亮)，false（不常亮） */
    isKeep: boolean;
}
/**
 * 设置屏幕亮度和常亮 返回结果定义
 * @apiName biz.util.setScreenBrightnessAndKeepOn
 */
export interface IBizUtilSetScreenBrightnessAndKeepOnResult {
}
/**
 * 设置屏幕亮度和常亮
 * @apiName biz.util.setScreenBrightnessAndKeepOn
 * @supportVersion ios: 4.3.3 android: 4.3.3
 */
export declare function setScreenBrightnessAndKeepOn$(params: IBizUtilSetScreenBrightnessAndKeepOnParams): Promise<IBizUtilSetScreenBrightnessAndKeepOnResult>;
export default setScreenBrightnessAndKeepOn$;
