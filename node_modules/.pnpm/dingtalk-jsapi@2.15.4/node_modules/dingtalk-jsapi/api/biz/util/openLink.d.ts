/**
 * 新开页面 请求参数定义
 * @apiName biz.util.openLink
 */
export interface IBizUtilOpenLinkParams {
    /** 要打开链接的地址 */
    url: string;
    /** 新页面是否展示分享按钮 */
    enableShare?: boolean;
}
/**
 * 新开页面 返回结果定义
 * @apiName biz.util.openLink
 */
export interface IBizUtilOpenLinkResult {
}
/**
 * 新开页面/在新窗口上打开链接
 * @apiName biz.util.openLink
 * @supportVersion  pc: 2.7.0 ios: 2.4.0 android: 2.4.0
 */
export declare function openLink$(params: IBizUtilOpenLinkParams): Promise<IBizUtilOpenLinkResult>;
export default openLink$;
