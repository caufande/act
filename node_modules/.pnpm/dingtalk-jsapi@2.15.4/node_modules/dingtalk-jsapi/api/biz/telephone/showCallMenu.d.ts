/**
 * 打电话选择面板 请求参数定义
 * @apiName biz.telephone.showCallMenu
 */
export interface IBizTelephoneShowCallMenuParams {
    [key: string]: any;
}
/**
 * 打电话选择面板 返回结果定义
 * @apiName biz.telephone.showCallMenu
 */
export interface IBizTelephoneShowCallMenuResult {
    [key: string]: any;
}
/**
 * 打电话选择面板
 * @apiName biz.telephone.showCallMenu
 * @supportVersion  ios: 2.8.0 android: 2.8.0
 */
export declare function showCallMenu$(params: IBizTelephoneShowCallMenuParams): Promise<IBizTelephoneShowCallMenuResult>;
export default showCallMenu$;
