/**
 * 支付宝移动支付Sdk，订单支付JS-API封装 请求参数定义
 * @apiName biz.alipay.pay
 */
export interface IBizAlipayPayParams {
    [key: string]: any;
}
/**
 * 支付宝移动支付Sdk，订单支付JS-API封装 返回结果定义
 * @apiName biz.alipay.pay
 */
export interface IBizAlipayPayResult {
    [key: string]: any;
}
/**
 * 支付宝移动支付Sdk，订单支付JS-API封装
 * @apiName biz.alipay.pay
 * @supportVersion  ios: 2.8.0 android: 2.8.0
 */
export declare function pay$(params: IBizAlipayPayParams): Promise<IBizAlipayPayResult>;
export default pay$;
