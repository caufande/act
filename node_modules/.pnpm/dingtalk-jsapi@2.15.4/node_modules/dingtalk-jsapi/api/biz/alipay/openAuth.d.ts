/**
 * 开放给内部或二方合作伙伴跳到支付宝完成电子发票、账户授权、独立签约功能 请求参数定义
 * @apiName biz.alipay.openAuth
 */
export interface IBizAlipayOpenAuthParams {
    /** 0：电子发票(Invoice) 1：账户授权(AccountAuth) 2：独立签约(Deduct) */
    bizType: number;
    /** 随 bizType 各不相同的业务参数。对于独立签约业务，仅需要一个参数 "sign_params"，生成规则详见支付宝开放文档，https://opendocs.alipay.com/pre-open/20170601105911096277/lpxi4u */
    params: string;
    /** 是否在用户未安装支付宝的情况下，展示一个 H5 页面引导用户安装支付宝 */
    useBrowserLanding?: boolean;
}
/**
 * 开放给内部或二方合作伙伴跳到支付宝完成电子发票、账户授权、独立签约功能 返回结果定义
 * @apiName biz.alipay.openAuth
 */
export interface IBizAlipayOpenAuthResult {
    /** 支付宝返回的结果码 */
    resultCode: number;
    /** 支付宝请求业务功能返回的数据 */
    result: string;
}
/**
 * 开放给内部或二方合作伙伴跳到支付宝完成电子发票、账户授权、独立签约功能
 * @apiName biz.alipay.openAuth
 * @supportVersion ios: 5.1.8 android: 5.1.8
 * @author Android：珑一 iOS：姚曦
 */
export declare function openAuth$(params: IBizAlipayOpenAuthParams): Promise<IBizAlipayOpenAuthResult>;
export default openAuth$;
