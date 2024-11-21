/**
 *  请求参数定义
 * @apiName runtime.message.post
 */
export interface IRuntimeMessagePostParams {
    [key: string]: any;
}
/**
 *  返回结果定义
 * @apiName runtime.message.post
 */
export interface IRuntimeMessagePostResult {
    [key: string]: any;
}
/**
 *
 * @apiName runtime.message.post
 * @supportVersion  ios: 2.6.0 android: 2.6.0
 */
export declare function post$(params: IRuntimeMessagePostParams): Promise<IRuntimeMessagePostResult>;
export default post$;
