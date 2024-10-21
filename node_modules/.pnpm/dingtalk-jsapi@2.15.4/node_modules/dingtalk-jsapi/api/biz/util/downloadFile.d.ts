/**
 * 下载文件 请求参数定义
 * @apiName biz.util.downloadFile
 */
export interface IBizUtilDownloadFileParams {
    [key: string]: any;
}
/**
 * 下载文件 返回结果定义
 * @apiName biz.util.downloadFile
 */
export interface IBizUtilDownloadFileResult {
    [key: string]: any;
}
/**
 * 下载文件
 * @apiName biz.util.downloadFile
 * @supportVersion  pc: 2.5.0
 */
export declare function downloadFile$(params: IBizUtilDownloadFileParams): Promise<IBizUtilDownloadFileResult>;
export default downloadFile$;
