/**
 * 拨打单人电话选项（可定制） 请求参数定义
 * @apiName biz.telephone.quickCallList
 */
export interface IBizTelephoneQuickCallListParams {
    [key: string]: any;
}
/**
 * 拨打单人电话选项（可定制） 返回结果定义
 * @apiName biz.telephone.quickCallList
 */
export interface IBizTelephoneQuickCallListResult {
    [key: string]: any;
}
/**
 * 拨打单人电话选项（可定制）
 * @apiName biz.telephone.quickCallList
 * @supportVersion  pc: 3.5.6 ios: 3.5.6 android: 3.5.6
 */
export declare function quickCallList$(params: IBizTelephoneQuickCallListParams): Promise<IBizTelephoneQuickCallListResult>;
export default quickCallList$;
