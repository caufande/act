/**
 * 读取开放的临时数据 请求参数定义
 * @apiName util.openTemporary.getData
 */
export interface IUtilOpenTemporaryGetDataParams {
}
/**
 * 读取开放的临时数据 返回结果定义
 * @apiName util.openTemporary.getData
 */
export interface IUtilOpenTemporaryGetDataResult {
    /** 返回的数据 */
    content: string;
}
/**
 * 读取开放的临时数据
 * @apiName util.openTemporary.getData
 * @supportVersion ios: 6.3.15 android: 6.3.15
 * @author 克比
 */
export declare function getData$(params: IUtilOpenTemporaryGetDataParams): Promise<IUtilOpenTemporaryGetDataResult>;
export default getData$;
