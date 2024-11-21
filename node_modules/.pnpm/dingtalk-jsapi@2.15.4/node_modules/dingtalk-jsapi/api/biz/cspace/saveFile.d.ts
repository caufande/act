/**
 * 转存附件 请求参数定义
 * @apiName biz.cspace.saveFile
 */
export interface IBizCspaceSaveFileParams {
    /** 用户当前的corpid，将只能存储到当前corpid对应企业的钉盘和个人钉盘 */
    corpId: string;
    /** 文件在第三方服务器地址， 也可为通过服务端接口上传文件得到的media_id，详见参数说明 */
    url: string;
    /** 文件保存的名字 */
    name: string;
}
/**
 * 转存附件 返回结果定义
 * @apiName biz.cspace.saveFile
 */
export interface IBizCspaceSaveFileResult {
    data: Array<{
        /** 空间id */
        spaceId: string;
        /** 文件id */
        fileId: string;
        /** 文件名 */
        fileName: string;
        /** 文件大小 */
        fileSize: number;
        /** 文件类型 */
        fileType: string;
    }>;
}
/**
 * 转存附件
 * @apiName biz.cspace.saveFile
 * @supportVersion  ios: 2.7.6 android: 2.7.6
 */
export declare function saveFile$(params: IBizCspaceSaveFileParams): Promise<IBizCspaceSaveFileResult>;
export default saveFile$;
