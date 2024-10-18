/**
 * 上传文件 请求参数定义
 * @apiName biz.util.uploadFile
 */
export interface IBizUtilUploadFileParams {
    /** 开发者服务器地址 */
    url: string;
    /** 要上传文件资源的本地定位符，仅支持虚拟路径 */
    filePath: string;
    /** 文件名，即对应的 key, 开发者在服务器端通过这个 key 可以获取到文件二进制内容 */
    fileName: string;
    /** HTTP 请求 Header */
    header: any;
    /** HTTP 请求中其他额外的 form 数据。 */
    formData: any;
}
/**
 * 上传文件 返回结果定义
 * @apiName biz.util.uploadFile
 */
export interface IBizUtilUploadFileResult {
    /** 服务器返回的数据 */
    data: any;
    /** HTTP 状态码 */
    statusCode: string;
    /** 服务器返回的 header */
    header: any;
}
/**
 * 上传文件
 * @apiName biz.util.uploadFile
 * @supportVersion ios: 6.5.28 android: 6.5.27
 * @author Android：泠轩 iOS：无最
 */
export declare function uploadFile$(params: IBizUtilUploadFileParams): Promise<IBizUtilUploadFileResult>;
export default uploadFile$;
