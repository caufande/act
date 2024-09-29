/**
 * 旋转WebView，并在旋转的同时隐藏导航栏 请求参数定义
 * @apiName device.screen.rotateView
 */
export interface IDeviceScreenRotateViewParams {
    [key: string]: any;
}
/**
 * 旋转WebView，并在旋转的同时隐藏导航栏 返回结果定义
 * @apiName device.screen.rotateView
 */
export interface IDeviceScreenRotateViewResult {
    [key: string]: any;
}
/**
 * 旋转WebView，并在旋转的同时隐藏导航栏
 * @apiName device.screen.rotateView
 * @supportVersion  android: 4.0
 */
export declare function rotateView$(params: IDeviceScreenRotateViewParams): Promise<IDeviceScreenRotateViewResult>;
export default rotateView$;
