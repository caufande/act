/**
 * 附件预览 请求参数定义
 * @apiName biz.cspace.preview
 */
export interface IBizCspacePreviewParams {
    /** 用户当前的corpid，此文件预览成功后只能转发或保存到此corpId对应的企业群和个人 */
    corpId: string;
    /** 空间ID */
    spaceId: string;
    /** 文件ID */
    fileId: string;
    /** 文件名称 */
    fileName: string;
    /** 文件大小，字节数 */
    fileSize: number;
    /** 文件扩展名 */
    fileType: string;
    /** 预览时候可以控制是否显示 下载、转发等等按钮, 暂支持移动端 */
    mode?: 'safe' | 'normal' | 'edit' | 'revise' | 'restrict';
    /** 表示预览文件的某个版本，4.3.5开始支持，支持移动端 */
    version?: string;
}
/**
 * 附件预览 返回结果定义
 * @apiName biz.cspace.preview
 */
export interface IBizCspacePreviewResult {
}
/**
 * 附件预览
 * @apiName biz.cspace.preview
 * @supportVersion  pc: 3.0.0 ios: 2.7.0 android: 2.7.0
 */
export declare function preview$(params: IBizCspacePreviewParams): Promise<IBizCspacePreviewResult>;
export default preview$;
