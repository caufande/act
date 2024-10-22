/**
 * 弹窗alert 请求参数定义
 * @apiName biz.util.previewImage
 */
export interface IBizUtilPreviewImageParams {
    /** 图片地址列表 */
    urls: string[];
    /** 当前显示的图片链接 */
    current?: string;
    /** 是否显示删除按钮 默认 'false'*/
    showRemoveButton?: string;
    /** 预览后长按图片是否显示长按菜单，默认显示 默认 'true'*/
    enableLongPress?: string;
    /** 预览后图片是否显示保存按钮，默认显示 默认 'true'*/
    showDownload?: string;
}
/**
 * 弹窗alert 返回结果定义
 * @apiName biz.util.previewImage
 */
export interface IBizUtilPreviewImageResult {
    [key: string]: any;
}
/**
 * 弹窗alert
 * @description 调用此api，将显示一个图片浏览器
 * @apiName biz.util.previewImage
 * @supportVersion  pc: 2.7.0 ios: 2.4.0 android: 2.4.0
 * @author Android：石涅 iOS：驽良
 */
export declare function previewImage$(params: IBizUtilPreviewImageParams): Promise<IBizUtilPreviewImageResult>;
export default previewImage$;
