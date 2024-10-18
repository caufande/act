/**
 * 检查某个corpId下的办公电话是否开通 请求参数定义
 * @apiName biz.telephone.checkBizCall
 */
export interface IBizTelephoneCheckBizCallParams {
    [key: string]: any;
}
/**
 * 检查某个corpId下的办公电话是否开通 返回结果定义
 * @apiName biz.telephone.checkBizCall
 */
export interface IBizTelephoneCheckBizCallResult {
    [key: string]: any;
}
/**
 * 检查某个corpId下的办公电话是否开通
 * @apiName biz.telephone.checkBizCall
 * @supportVersion  pc: 4.0.0 ios: 3.5.6 android: 3.5.6
 */
export declare function checkBizCall$(params: IBizTelephoneCheckBizCallParams): Promise<IBizTelephoneCheckBizCallResult>;
export default checkBizCall$;
