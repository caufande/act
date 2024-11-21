/**
 * 本地存储（区分域名）删除 请求参数定义
 * @apiName util.domainStorage.removeItem
 */
export interface IUtilDomainStorageRemoveItemParams {
    /** 存储信息的key值 */
    name: string;
}
/**
 * 本地存储（区分域名）删除 返回结果定义
 * @apiName util.domainStorage.removeItem
 */
export interface IUtilDomainStorageRemoveItemResult {
}
/**
 * 删除相应存储信息 本地存储（区分域名）删除
 * @apiName util.domainStorage.removeItem
 * @supportVersion  ios: 2.9.0 android: 2.9.0
 */
export declare function removeItem$(params: IUtilDomainStorageRemoveItemParams): Promise<IUtilDomainStorageRemoveItemResult>;
export default removeItem$;
