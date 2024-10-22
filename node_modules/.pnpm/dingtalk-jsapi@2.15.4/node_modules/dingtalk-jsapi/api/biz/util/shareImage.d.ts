/**
 * 分享图片，可传入图片链接，也可由容器自动抓取当前容器内容 请求参数定义
 * @apiName biz.util.shareImage
 */
export interface IBizUtilShareImageParams {
    /** 本地文件地址 */
    fileURL?: string;
    /** dd/wxhy。钉钉/微信好友 */
    destChannelStyle?: string;
    autoCapture?: boolean;
}
/**
 * 分享图片，可传入图片链接，也可由容器自动抓取当前容器内容 返回结果定义
 * @apiName biz.util.shareImage
 */
export interface IBizUtilShareImageResult {
}
/**
 * 分享图片，可传入图片链接，也可由容器自动抓取当前容器内容
 * @apiName biz.util.shareImage
 * @supportVersion  ios: 4.1 android: 4.1
 * @author android: 朴文 ios: 驽良
 */
export declare function shareImage$(params: IBizUtilShareImageParams): Promise<IBizUtilShareImageResult>;
export default shareImage$;
