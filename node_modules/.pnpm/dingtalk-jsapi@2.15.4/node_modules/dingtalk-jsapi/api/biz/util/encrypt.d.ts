/**
 * 加密 请求参数定义
 * @apiName biz.util.encrypt
 */
export interface IBizUtilEncryptParams {
    [key: string]: any;
}
/**
 * 加密 返回结果定义
 * @apiName biz.util.encrypt
 */
export interface IBizUtilEncryptResult {
    [key: string]: any;
}
/**
 * 加密
 * @apiName biz.util.encrypt
 * @supportVersion  pc: 3.0.0 ios: 2.9.1 android: 2.9.1
 */
export declare function encrypt$(params: IBizUtilEncryptParams): Promise<IBizUtilEncryptResult>;
export default encrypt$;
