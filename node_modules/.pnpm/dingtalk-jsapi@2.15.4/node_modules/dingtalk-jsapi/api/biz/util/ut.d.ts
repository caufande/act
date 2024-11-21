/**
 * 上报埋点 请求参数定义
 * @apiName biz.util.ut
 */
export interface IBizUtilUtParams {
    /** gmkey */
    key: string;
    /** gokey, jsapi层填obj */
    value?: {
        [key: string]: string;
    };
}
/**
 * 上报埋点 返回结果定义
 * @apiName biz.util.ut
 */
export interface IBizUtilUtResult {
    [key: string]: any;
}
/**
 * 上报埋点
 * @apiName biz.util.ut
 * @supportVersion  pc: 3.0.0 ios: 2.4.0 android: 2.4.0
 */
export declare function ut$(params: IBizUtilUtParams): Promise<IBizUtilUtResult>;
export default ut$;
