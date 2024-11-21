/**
 * 开始签批（pdf全文批注或表单签批 ） 请求参数定义
 * @apiName biz.util.startDocSign
 */
export interface IBizUtilStartDocSignParams {
    [key: string]: any;
}
/**
 * 开始签批（pdf全文批注或表单签批 ） 返回结果定义
 * @apiName biz.util.startDocSign
 */
export interface IBizUtilStartDocSignResult {
    [key: string]: any;
}
/**
 * 开始签批（pdf全文批注或表单签批 ）
 * @apiName biz.util.startDocSign
 * @supportVersion ios: 4.6.33 android: 4.6.33
 */
export declare function startDocSign$(params: IBizUtilStartDocSignParams): Promise<IBizUtilStartDocSignResult>;
export default startDocSign$;
