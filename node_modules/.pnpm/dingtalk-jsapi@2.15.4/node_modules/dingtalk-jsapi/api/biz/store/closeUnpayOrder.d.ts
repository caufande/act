/**
 * 关闭订单 请求参数定义
 * @apiName biz.store.closeUnpayOrder
 */
export interface IBizStoreCloseUnpayOrderParams {
    params: string;
}
/**
 * 关闭订单 返回结果定义
 * @apiName biz.store.closeUnpayOrder
 */
export interface IBizStoreCloseUnpayOrderResult {
    success: boolean;
}
/**
 * 关闭订单
 * @apiName biz.store.closeUnpayOrder
 * @supportVersion ios: 4.3.7 android: 4.3.7
 */
export declare function closeUnpayOrder$(params: IBizStoreCloseUnpayOrderParams): Promise<IBizStoreCloseUnpayOrderResult>;
export default closeUnpayOrder$;
