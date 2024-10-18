/**
 * 关闭图片预览 请求参数定义
 * @apiName biz.util.closePreviewImage
 */
export interface IBizUtilClosePreviewImageParams {
}
/**
 * 关闭图片预览 返回结果定义
 * @apiName biz.util.closePreviewImage
 */
export interface IBizUtilClosePreviewImageResult {
}
/**
 * 关闭图片预览
 * @apiName biz.util.closePreviewImage
 * @supportVersion ios: 6.0.19 android: 6.0.17
 * @author Android：@风纭 iOS：@蒙歌
 */
export declare function closePreviewImage$(params: IBizUtilClosePreviewImageParams): Promise<IBizUtilClosePreviewImageResult>;
export default closePreviewImage$;
