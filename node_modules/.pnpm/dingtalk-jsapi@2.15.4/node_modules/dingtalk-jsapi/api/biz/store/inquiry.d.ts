/**
 * 内购查询 请求参数定义
 * @apiName biz.store.inquiry
 */
export interface IBizStoreInquiryParams {
    params: string;
}
/**
 * 内购查询 返回结果定义
 * @apiName biz.store.inquiry
 */
export interface IBizStoreInquiryResult {
    bizOrderId: string;
    totalFee: number;
    totalActualPayFee: number;
    totalActualPromFee: number;
    refundFee: number;
}
/**
 * 内购查询
 * @apiName biz.store.inquiry
 * @supportVersion ios: 4.3.7 android: 4.3.7
 */
export declare function inquiry$(params: IBizStoreInquiryParams): Promise<IBizStoreInquiryResult>;
export default inquiry$;
