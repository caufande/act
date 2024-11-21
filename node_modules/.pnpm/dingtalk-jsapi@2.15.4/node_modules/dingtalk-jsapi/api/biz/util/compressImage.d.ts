/**
 * 图片压缩 请求参数定义
 * @apiName biz.util.compressImage
 */
export interface IBizUtilCompressImageParams {
    /** 要压缩的图片地址数组 */
    filePaths: string[];
    /** 压缩级别，支持 0 ~ 4 的整数，默认 4。 */
    compressLevel?: number;
}
/**
 * 图片压缩 返回结果定义
 * @apiName biz.util.compressImage
 */
export interface IBizUtilCompressImageResult {
    /** 压缩后的路径数组 */
    filePaths: string[];
}
/**
 * 图片压缩
 * @apiName biz.util.compressImage
 * @supportVersion ios: 5.1.1 android: 5.1.1
 */
export declare function compressImage$(params: IBizUtilCompressImageParams): Promise<IBizUtilCompressImageResult>;
export default compressImage$;
