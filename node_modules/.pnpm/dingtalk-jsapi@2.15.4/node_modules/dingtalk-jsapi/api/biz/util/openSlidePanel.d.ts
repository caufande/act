/**
 * 打开侧边框 请求参数定义
 * @apiName biz.util.openSlidePanel
 */
export interface IBizUtilOpenSlidePanelParams {
    [key: string]: any;
}
/**
 * 打开侧边框 返回结果定义
 * @apiName biz.util.openSlidePanel
 */
export interface IBizUtilOpenSlidePanelResult {
    [key: string]: any;
}
/**
 * 打开侧边框
 * @apiName biz.util.openSlidePanel
 * @supportVersion  pc: 2.5.0
 */
export declare function openSlidePanel$(params: IBizUtilOpenSlidePanelParams): Promise<IBizUtilOpenSlidePanelResult>;
export default openSlidePanel$;
