/**
 * 清理Web缓存 请求参数定义
 * @apiName biz.util.clearWebStoreCache
 */
export interface IBizUtilClearWebStoreCacheParams {
}
/**
 * 清理Web缓存 返回结果定义
 * @apiName biz.util.clearWebStoreCache
 */
export interface IBizUtilClearWebStoreCacheResult {
    /** 用户是否选择清理 */
    choice_clear: boolean;
}
/**
 * 清理Web缓存
 * @apiName biz.util.clearWebStoreCache
 * @supportVersion Windows：6.0.22
 * @author Windows： 心存
 */
export declare function clearWebStoreCache$(params: IBizUtilClearWebStoreCacheParams): Promise<IBizUtilClearWebStoreCacheResult>;
export default clearWebStoreCache$;
