/**
 * 检测本地文件存在 请求参数定义
 * @apiName biz.util.isLocalFileExist
 */
export interface IBizUtilIsLocalFileExistParams {
    [key: string]: any;
}
/**
 * 检测本地文件存在 返回结果定义
 * @apiName biz.util.isLocalFileExist
 */
export interface IBizUtilIsLocalFileExistResult {
    [key: string]: any;
}
/**
 * 检测本地文件存在
 * @apiName biz.util.isLocalFileExist
 * @supportVersion  pc: 2.5.0
 */
export declare function isLocalFileExist$(params: IBizUtilIsLocalFileExistParams): Promise<IBizUtilIsLocalFileExistResult>;
export default isLocalFileExist$;
