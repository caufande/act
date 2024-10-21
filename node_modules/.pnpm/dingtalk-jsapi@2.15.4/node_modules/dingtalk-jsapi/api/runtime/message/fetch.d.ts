/**
 *  请求参数定义
 * @apiName runtime.message.fetch
 */
export interface IRuntimeMessageFetchParams {
    [key: string]: any;
}
/**
 *  返回结果定义
 * @apiName runtime.message.fetch
 */
export interface IRuntimeMessageFetchResult {
    [key: string]: any;
}
/**
 *
 * @apiName runtime.message.fetch
 * @supportVersion  ios: 2.6.0 android: 2.6.0
 */
export declare function fetch$(params: IRuntimeMessageFetchParams): Promise<IRuntimeMessageFetchResult>;
export default fetch$;
