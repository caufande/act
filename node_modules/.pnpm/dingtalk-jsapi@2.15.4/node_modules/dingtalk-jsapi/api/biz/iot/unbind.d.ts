/**
 * iot设备解绑 请求参数定义
 * @apiName biz.iot.unbind
 */
export interface IBizIotUnbindParams {
    [key: string]: any;
}
/**
 * iot设备解绑 返回结果定义
 * @apiName biz.iot.unbind
 */
export interface IBizIotUnbindResult {
    [key: string]: any;
}
/**
 * iot设备解绑
 * @apiName biz.iot.unbind
 * @supportVersion ios: 4.6.34 android: 4.6.34
 */
export declare function unbind$(params: IBizIotUnbindParams): Promise<IBizIotUnbindResult>;
export default unbind$;
