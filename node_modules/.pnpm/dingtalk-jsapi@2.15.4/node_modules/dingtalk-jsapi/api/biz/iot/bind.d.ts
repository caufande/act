/**
 * iot设备绑定 请求参数定义
 * @apiName biz.iot.bind
 */
export interface IBizIotBindParams {
    [key: string]: any;
}
/**
 * iot设备绑定 返回结果定义
 * @apiName biz.iot.bind
 */
export interface IBizIotBindResult {
    [key: string]: any;
}
/**
 * iot设备绑定
 * @apiName biz.iot.bind
 * @supportVersion ios: 4.6.34 android: 4.6.34
 */
export declare function bind$(params: IBizIotBindParams): Promise<IBizIotBindResult>;
export default bind$;
