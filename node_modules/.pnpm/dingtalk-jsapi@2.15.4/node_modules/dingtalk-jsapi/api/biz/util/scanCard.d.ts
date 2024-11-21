/**
 * 名片扫描 请求参数定义
 * @apiName biz.util.scanCard
 */
export interface IBizUtilScanCardParams {
    [key: string]: any;
}
/**
 * 名片扫描 返回结果定义
 * @apiName biz.util.scanCard
 */
export interface IBizUtilScanCardResult {
    [key: string]: any;
}
/**
 * 名片扫描
 * @apiName biz.util.scanCard
 * @supportVersion  ios: 2.8.0 android: 2.8.0
 */
export declare function scanCard$(params: IBizUtilScanCardParams): Promise<IBizUtilScanCardResult>;
export default scanCard$;
