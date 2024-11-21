/**
 * 本地存储（区分域名）读 请求参数定义
 * @apiName util.domainStorage.getItem
 */
export interface IUtilDomainStorageGetItemParams {
    /** 存储信息的key值 */
    name: string;
}
/**
 * 本地存储（区分域名）读 返回结果定义
 * @apiName util.domainStorage.getItem
 */
export interface IUtilDomainStorageGetItemResult {
    /** name对应的存储信息 */
    value: string;
}
/**
 * 获取存储信息 本地存储（区分域名）读
 * @apiName util.domainStorage.getItem
 * @supportVersion  ios: 2.9.0 android: 2.9.0
 */
export declare function getItem$(params: IUtilDomainStorageGetItemParams): Promise<IUtilDomainStorageGetItemResult>;
export default getItem$;
