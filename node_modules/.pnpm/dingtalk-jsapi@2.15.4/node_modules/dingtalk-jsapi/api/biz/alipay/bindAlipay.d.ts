/**
 * 绑定支付宝 请求参数定义
 * @apiName biz.alipay.bindAlipay
 */
export interface IBizAlipayBindAlipayParams {
    /** 绑定支付宝所在的业务场景,请和服务端约定好 */
    bizType: string;
    /** 是否显示支付宝授权协议弹框 默认true */
    showLicense?: boolean;
}
/**
 * 绑定支付宝 返回结果定义
 * @apiName biz.alipay.bindAlipay
 */
export interface IBizAlipayBindAlipayResult {
}
/**
 * 绑定支付宝
 * @apiName biz.alipay.bindAlipay
 * @supportVersion ios: 6.3.15 android: 6.3.15
 * @author Android：峰砺 iOS： 边枫
 */
export declare function bindAlipay$(params: IBizAlipayBindAlipayParams): Promise<IBizAlipayBindAlipayResult>;
export default bindAlipay$;
