/**
 * 打开一个标签 请求参数定义
 * @apiName biz.util.invokeWorkbench
 */
export interface IBizUtilInvokeWorkbenchParams {
    app_url: string;
    app_info: any;
}
/**
 * 打开一个标签 返回结果定义
 * @apiName biz.util.invokeWorkbench
 */
export interface IBizUtilInvokeWorkbenchResult {
}
/**
 * 打开一个标签
 * @apiName biz.util.invokeWorkbench
 * @supportVersion win: 6.0.8 mac: 6.0.8
 * @author win: 周镛, mac: 伯温
 */
export declare function invokeWorkbench$(params: IBizUtilInvokeWorkbenchParams): Promise<IBizUtilInvokeWorkbenchResult>;
export default invokeWorkbench$;
