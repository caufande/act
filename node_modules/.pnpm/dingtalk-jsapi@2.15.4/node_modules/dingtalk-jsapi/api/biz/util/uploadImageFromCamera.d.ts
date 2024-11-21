/**
 * 上传图片 请求参数定义
 * @apiName biz.util.uploadImageFromCamera
 */
export interface IBizUtilUploadImageFromCameraParams {
    /** 是否压缩 */
    compression?: boolean;
    /** Number为正整数，取值 0~100， 表示图片压缩质量，数值越小压缩越严重 */
    quality?: number;
    /** Number为正整数，取值 0~100， 表示图片压缩质量，数值越小缩放越多 */
    resize?: number;
    /** 水印信息，钉钉v2.11.0之后版本支持 */
    stickers?: {
        time?: string;
        dateWeather?: string;
        username?: string;
        address?: string;
    };
}
/**
 * 上传图片 返回结果定义
 * @apiName biz.util.uploadImageFromCamera
 * @returnDemo ['https://static.dingtalk.com/media/lADOA9bQH8zIzMg_200_200.jpg']
 */
export declare type IBizUtilUploadImageFromCameraResult = string[];
/**
 * 上传图片（仅支持拍照上传）
 * 只支持直接拍照上传，即调用这个API之后将直接调起相机界面
 * 比如可以应用在，需要用户上传即时照片的场景。成功上传之后回调onSuccess方法，返回图片链接
 * @apiName biz.util.uploadImageFromCamera
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function uploadImageFromCamera$(params: IBizUtilUploadImageFromCameraParams): Promise<IBizUtilUploadImageFromCameraResult>;
export default uploadImageFromCamera$;
