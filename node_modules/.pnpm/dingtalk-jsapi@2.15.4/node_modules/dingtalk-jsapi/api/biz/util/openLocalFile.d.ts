/**
 * 打开本地文件 请求参数定义
 * @apiName biz.util.openLocalFile
 */
export interface IBizUtilOpenLocalFileParams {
    [key: string]: any;
}
/**
 * 打开本地文件 返回结果定义
 * @apiName biz.util.openLocalFile
 */
export interface IBizUtilOpenLocalFileResult {
    [key: string]: any;
}
/**
 * 打开本地文件
 * @apiName biz.util.openLocalFile
 * @supportVersion  pc: 2.5.0
 */
export declare function openLocalFile$(params: IBizUtilOpenLocalFileParams): Promise<IBizUtilOpenLocalFileResult>;
export default openLocalFile$;
