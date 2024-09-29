/**
 * 保存图片，可传入图片链接，也可由容器自动抓取当前容器内容 请求参数定义
 * @apiName biz.util.saveImage
 */
export interface IBizUtilSaveImageParams {
    /** 图片URL */
    image: string;
}
/**
 * 保存图片，可传入图片链接，也可由容器自动抓取当前容器内容 返回结果定义
 * @apiName biz.util.saveImage
 */
export interface IBizUtilSaveImageResult {
}
/**
 * 保存图片，可传入图片链接，也可由容器自动抓取当前容器内容
 * @apiName biz.util.saveImage
 * @supportVersion  ios: 4.1 android: 4.1
 * @author android: 朴文 ios: 驽良
 */
export declare function saveImage$(params: IBizUtilSaveImageParams): Promise<IBizUtilSaveImageResult>;
export default saveImage$;
