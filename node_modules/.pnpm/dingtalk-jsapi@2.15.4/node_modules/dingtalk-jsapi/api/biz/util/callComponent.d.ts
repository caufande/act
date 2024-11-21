/**
 * 打开一方授权页面 请求参数定义
 * @apiName biz.util.callComponent
 */
export interface IBizUtilCallComponentParams {
    /** 打开一方H5 或 小程序，目前仅支持 h5 和 miniProgram 两个值 */
    componentType: string;
    /** 参数说明 */
    params: {
        [key: string]: any;
    };
}
/**
 * 打开一方授权页面 返回结果定义
 * @apiName biz.util.callComponent
 */
export interface IBizUtilCallComponentResult {
    [key: string]: any;
}
/**
 * 打开一方授权页面
 * @apiName biz.util.callComponent
 * @supportVersion ios: 6.3.35 android: 6.3.35 pc: 6.3.35
 * @author Android：理致 iOS：犹树 Mac： 千谋 win： 仟晨
 */
export declare function callComponent$(params: IBizUtilCallComponentParams): Promise<IBizUtilCallComponentResult>;
export default callComponent$;
