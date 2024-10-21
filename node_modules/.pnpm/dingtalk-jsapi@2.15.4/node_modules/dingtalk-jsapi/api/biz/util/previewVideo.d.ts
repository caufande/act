/**
 * 在新零售的场景下，支持在本地进行预览视频 请求参数定义
 * @apiName biz.util.previewVideo
 */
export interface IBizUtilPreviewVideoParams {
    /** 视频的远端路径或者本地路径（必填） */
    url: string;
    /** 视频的名字（必填） */
    fileName: string;
    /** 视频的预览缩略图 （非必填的） */
    thumbnail?: string;
}
/**
 * 在新零售的场景下，支持在本地进行预览视频 返回结果定义
 * @apiName biz.util.previewVideo
 */
export interface IBizUtilPreviewVideoResult {
}
/**
 * 在新零售的场景下，支持在本地进行预览视频
 * @apiName biz.util.previewVideo
 * @supportVersion ios: 4.3.7 android: 4.3.7 pc: 4.6.33
 */
export declare function previewVideo$(params: IBizUtilPreviewVideoParams): Promise<IBizUtilPreviewVideoResult>;
export default previewVideo$;
