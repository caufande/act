/**
 * 编辑联系人 请求参数定义
 * @apiName biz.contact.externalEditForm
 */
export interface IBizContactExternalEditFormParams {
    [key: string]: any;
}
/**
 * 编辑联系人 返回结果定义
 * @apiName biz.contact.externalEditForm
 */
export interface IBizContactExternalEditFormResult {
    [key: string]: any;
}
/**
 * 编辑联系人
 * @apiName biz.contact.externalEditForm
 * @supportVersion  ios: 3.0 android: 3.0
 */
export declare function externalEditForm$(params: IBizContactExternalEditFormParams): Promise<IBizContactExternalEditFormResult>;
export default externalEditForm$;
