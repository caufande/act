/**
 * 视频压缩 请求参数定义
 * @apiName biz.media.compressVideo
 */
export interface IBizMediaCompressVideoParams {
    /** 要压缩的视频路径（只支持解析虚拟地址） */
    filePath: string;
}
/**
 * 视频压缩 返回结果定义
 * @apiName biz.media.compressVideo
 */
export interface IBizMediaCompressVideoResult {
    /** 压缩后的路径（虚拟路径） */
    filePath: string;
}
/**
 * 视频压缩
 * @apiName biz.media.compressVideo
 * @supportVersion ios: 4.6.37 android: 4.6.37
 */
export declare function compressVideo$(params: IBizMediaCompressVideoParams): Promise<IBizMediaCompressVideoResult>;
export default compressVideo$;
