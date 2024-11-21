/**
 * 唤起iOS & Android系统分享菜单 请求参数定义
 * @apiName biz.util.systemShare
 */
export interface IBizUtilSystemShareParams {
    /**  1.Link 2.图片，限制 images 数组长度1-9 3.图片，图文限制 images 数组长度1-9, title：可选 4.纯文本，仅支持Android微信好友 */
    type: number;
    /** 分享标题，可选 */
    title?: string;
    /** 分享链接，可选 */
    url?: string;
    /** 分享链接缩略图，可选 */
    thumbImage?: string;
    /** 分享图片，可选 */
    images: string[];
}
/**
 * 唤起iOS & Android系统分享菜单 返回结果定义
 * @apiName biz.util.systemShare
 */
export interface IBizUtilSystemShareResult {
    [key: string]: any;
}
/**
 * 唤起iOS & Android系统分享菜单
 * @apiName biz.util.systemShare
 * @supportVersion ios: 4.5.10 android: 4.5.10
 */
export declare function systemShare$(params: IBizUtilSystemShareParams): Promise<IBizUtilSystemShareResult>;
export default systemShare$;
