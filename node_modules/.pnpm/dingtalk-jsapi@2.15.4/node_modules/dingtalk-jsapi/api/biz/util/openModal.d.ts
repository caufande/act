/**
 * 打开模态框 请求参数定义
 * @apiName biz.util.openModal
 */
export interface IBizUtilOpenModalParams {
    [key: string]: any;
}
/**
 * 打开模态框 返回结果定义
 * @apiName biz.util.openModal
 */
export interface IBizUtilOpenModalResult {
    [key: string]: any;
}
/**
 * 打开模态框
 * @apiName biz.util.openModal
 * @supportVersion  pc: 2.5.0
 */
export declare function openModal$(params: IBizUtilOpenModalParams): Promise<IBizUtilOpenModalResult>;
export default openModal$;
