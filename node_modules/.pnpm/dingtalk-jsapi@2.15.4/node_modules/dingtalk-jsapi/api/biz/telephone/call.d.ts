/**
 * 打电话 请求参数定义
 * @apiName biz.telephone.call
 */
export interface IBizTelephoneCallParams {
    [key: string]: any;
}
/**
 * 打电话 返回结果定义
 * @apiName biz.telephone.call
 */
export interface IBizTelephoneCallResult {
    [key: string]: any;
}
/**
 * 打电话
 * @apiName biz.telephone.call
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function call$(params: IBizTelephoneCallParams): Promise<IBizTelephoneCallResult>;
export default call$;
