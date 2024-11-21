/**
 * 选择手机联系人 请求参数定义
 * @apiName biz.contact.chooseMobileContacts
 */
export interface IBizContactChooseMobileContactsParams {
    [key: string]: any;
}
/**
 * 选择手机联系人 返回结果定义
 * @apiName biz.contact.chooseMobileContacts
 */
export interface IBizContactChooseMobileContactsResult {
    [key: string]: any;
}
/**
 * 选择手机联系人
 * @apiName biz.contact.chooseMobileContacts
 * @supportVersion  ios: 3.1 android: 3.1
 */
export declare function chooseMobileContacts$(params: IBizContactChooseMobileContactsParams): Promise<IBizContactChooseMobileContactsResult>;
export default chooseMobileContacts$;
