/**
 * 本地存储（区分域名）写 请求参数定义
 * @apiName util.domainStorage.setItem
 */
export interface IUtilDomainStorageSetItemParams {
    /** 存储信息的key值 */
    name: string;
    /** 存储信息的Value值 */
    value: string;
}
/**
 * 本地存储（区分域名）写 返回结果定义
 * @apiName util.domainStorage.setItem
 */
export interface IUtilDomainStorageSetItemResult {
    [key: string]: any;
}
/**
 * 本地存储（区分域名）写
 * 每次存储数据不能超过1M,单域名不能超过50M.
 * @apiName util.domainStorage.setItem
 * @supportVersion  ios: 2.9.0 android: 2.9.0
 */
export declare function setItem$(params: IUtilDomainStorageSetItemParams): Promise<IUtilDomainStorageSetItemResult>;
export default setItem$;
