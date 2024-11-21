/**
 * 获取支付链接 请求参数定义
 * @apiName biz.store.getPayUrl
 */
export interface IBizStoreGetPayUrlParams {
    params: string;
}
/**
 * 获取支付链接 返回结果定义
 * @apiName biz.store.getPayUrl
 */
export interface IBizStoreGetPayUrlResult {
    payUrl: string;
    unionPayUrl: string;
}
/**
 * 获取支付链接
 * @apiName biz.store.getPayUrl
 * @supportVersion ios: 4.3.7 android: 4.3.7
 */
export declare function getPayUrl$(params: IBizStoreGetPayUrlParams): Promise<IBizStoreGetPayUrlResult>;
export default getPayUrl$;
