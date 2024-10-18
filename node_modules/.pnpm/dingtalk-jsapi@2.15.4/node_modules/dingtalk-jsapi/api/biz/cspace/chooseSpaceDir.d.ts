/**
 * 唤起钉盘选择器 请求参数定义
 * @apiName biz.cspace.chooseSpaceDir
 */
export interface IBizCspaceChooseSpaceDirParams {
    /** 组织id， 必填，被选择的企业空间限制在corpid对应的企业下 */
    corpId: string;
}
/**
 * 唤起钉盘选择器 返回结果定义
 * @apiName biz.cspace.chooseSpaceDir
 */
export interface IBizCspaceChooseSpaceDirResult {
    data: Array<{
        /** 被选中文件夹所在的钉盘空间id */
        spaceId: string;
        /** 被选中的文件夹路径， 例如“/测试/测试子目录/” */
        path: string;
        /** 被选中的文件夹id */
        dirId: string;
    }>;
}
/**
 * 唤起钉盘选择器
 * 唤起钉盘选择器， 从当前用户的企业空间或个人空间选择一个目录， 用以保存文件等操作
 * @apiName biz.cspace.chooseSpaceDir
 * @supportVersion  ios: 3.5.6 android: 3.5.6 pc: 5.1.27
 * @author pc: 法真
 */
export declare function chooseSpaceDir$(params: IBizCspaceChooseSpaceDirParams): Promise<IBizCspaceChooseSpaceDirResult>;
export default chooseSpaceDir$;
