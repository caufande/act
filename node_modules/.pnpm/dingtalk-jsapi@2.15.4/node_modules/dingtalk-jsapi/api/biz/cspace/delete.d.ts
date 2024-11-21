/**
 * 删除钉盘附件 请求参数定义
 * @apiName biz.cspace.delete
 */
export interface IBizCspaceDeleteParams {
    /** 空间id */
    spaceId: string;
    /** 目录id */
    dentryId: string;
}
/**
 * 删除钉盘附件 返回结果定义
 * @apiName biz.cspace.delete
 */
export interface IBizCspaceDeleteResult {
}
/**
 * 删除钉盘附件
 * @apiName biz.cspace.delete
 * @supportVersion ios: 4.5.21 android: 4.5.21
 */
export declare function delete$(params: IBizCspaceDeleteParams): Promise<IBizCspaceDeleteResult>;
export default delete$;
