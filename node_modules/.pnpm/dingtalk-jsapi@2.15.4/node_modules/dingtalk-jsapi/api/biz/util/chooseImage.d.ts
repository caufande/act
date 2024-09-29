/**
 * 图片选择 请求参数定义
 * @apiName biz.util.chooseImage
 */
export interface IBizUtilChooseImageParams {
    /** 最大可选照片数，默认1张 */
    count?: number;
    /** 相册选取或者拍照，默认 ['camera','album'] */
    sourceType?: string[];
}
/**
 * 图片选择 返回结果定义
 * @apiName biz.util.chooseImage
 */
export interface IBizUtilChooseImageResult {
    filePaths: string[];
    files: Array<{
        path: string;
        size: number;
        fileType: string;
    }>;
}
/**
 * 图片选择
 * @apiName biz.util.chooseImage
 * @supportVersion ios: 5.1.1 android: 5.1.1
 * @author Android：狐斐 iOS：须莫
 */
export declare function chooseImage$(params: IBizUtilChooseImageParams): Promise<IBizUtilChooseImageResult>;
export default chooseImage$;
