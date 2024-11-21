/**
 * 上传图片 请求参数定义
 * @apiName biz.util.uploadImage
 */
export interface IBizUtilUploadImageParams {
    /** 默认 jsapi （>= 5.0.0） */
    bizType?: string;
    /**
     * （>= 5.0.0)
     * 1，STRICT_AUTH, 严格鉴权,下载文件时需要回调业务方进行鉴权，默认值 。
     * 4，TEMP_AUTH,  临时文件，过期后删除文件，无法访问。
     * 6，CDN_ONLY，公开文件，上传后只可以通过https下载
     */
    authType?: number;
    /** 是否多选，默认false */
    multiple?: boolean;
    /** 最多可选个数 */
    max?: number;
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
 * @apiName biz.util.uploadImage
 * @returnDemo ['https://static.dingtalk.com/media/lADOA9bQH8zIzMg_200_200.jpg']
 */
export declare type IBizUtilUploadImageResult = string[];
/**
 * 上传图片
 * 选择图片+上传，防止恶意上传。注意：在工作tab页自定义主页不能使用该组件，工作tab页一级页面会阻塞该组件的执行。
 * 将在成功上传之后回调onSuccess方法，返回alicdn上的图片链接。微应用也可以调用<input type="file" accept="image/*">来自定义上传图片，此标签钉钉客户端版本2.5及以上支持。
 * @apiName biz.util.uploadImage
 * @supportVersion  pc: 2.5.0 ios: 2.4.0 android: 2.4.0
 * @author android：卓剑， ios：须莫
 */
export declare function uploadImage$(params: IBizUtilUploadImageParams): Promise<IBizUtilUploadImageResult>;
export default uploadImage$;
