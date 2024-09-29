/**
 * 创建群 请求参数定义
 * @apiName biz.contact.createGroup
 */
export interface IBizContactCreateGroupParams {
    corpId?: string;
    users?: string[];
}
/**
 * 创建群 返回结果定义
 * @apiName biz.contact.createGroup
 */
export interface IBizContactCreateGroupResult {
    /** 企业群ID */
    id: string;
}
/**
 * 创建群
 * @apiName biz.contact.createGroup
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function createGroup$(params: IBizContactCreateGroupParams): Promise<IBizContactCreateGroupResult>;
export default createGroup$;
