/**
 * 创建订单 请求参数定义
 * @apiName biz.store.createOrder
 */
export interface IBizStoreCreateOrderParams {
    params: string;
}
/**
 * 创建订单 返回结果定义
 * @apiName biz.store.createOrder
 */
export interface IBizStoreCreateOrderResult {
    bizOrderId: string;
    totalFee: number;
    totalActualPayFee: number;
    totalActualPromFee: number;
    refundFee: number;
}
/**
 * 创建订单
 * @apiName biz.store.createOrder
 * @supportVersion ios: 4.3.7 android: 4.3.7
 */
export declare function createOrder$(params: IBizStoreCreateOrderParams): Promise<IBizStoreCreateOrderResult>;
export default createOrder$;
