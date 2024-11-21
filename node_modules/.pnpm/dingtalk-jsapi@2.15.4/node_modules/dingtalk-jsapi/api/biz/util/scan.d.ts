/**
 * 扫码(支持二维码和条形码) 请求参数定义
 * @apiName biz.util.scan
 */
export interface IBizUtilScanParams {
    [key: string]: any;
}
/**
 * 扫码(支持二维码和条形码) 返回结果定义
 * @apiName biz.util.scan
 */
export interface IBizUtilScanResult {
    [key: string]: any;
}
/**
 * 扫码(支持二维码和条形码)
 * @apiName biz.util.scan
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function scan$(params: IBizUtilScanParams): Promise<IBizUtilScanResult>;
export default scan$;
