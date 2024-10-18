/**
 * 跳转到实名身份绑定页面 请求参数定义
 * @apiName biz.verify.openBindIDCard
 */
export interface IBizVerifyOpenBindIDCardParams {
}
/**
 * 跳转到实名身份绑定页面 返回结果定义
 * @apiName biz.verify.openBindIDCard
 */
export interface IBizVerifyOpenBindIDCardResult {
}
/**
 * 跳转到实名身份绑定页面
 * @apiName biz.verify.openBindIDCard
 * @supportVersion ios: 4.5.21 android: 4.5.21
 */
export declare function openBindIDCard$(params: IBizVerifyOpenBindIDCardParams): Promise<IBizVerifyOpenBindIDCardResult>;
export default openBindIDCard$;
