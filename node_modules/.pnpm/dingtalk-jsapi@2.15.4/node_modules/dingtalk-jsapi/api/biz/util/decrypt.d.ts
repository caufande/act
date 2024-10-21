/**
 * 解密 请求参数定义
 * @apiName biz.util.decrypt
 */
export interface IBizUtilDecryptParams {
    [key: string]: any;
}
/**
 * 解密 返回结果定义
 * @apiName biz.util.decrypt
 */
export interface IBizUtilDecryptResult {
    [key: string]: any;
}
/**
 * 解密
 * @apiName biz.util.decrypt
 * @supportVersion  pc: 3.0.0 ios: 2.9.1 android: 2.9.1
 */
export declare function decrypt$(params: IBizUtilDecryptParams): Promise<IBizUtilDecryptResult>;
export default decrypt$;
