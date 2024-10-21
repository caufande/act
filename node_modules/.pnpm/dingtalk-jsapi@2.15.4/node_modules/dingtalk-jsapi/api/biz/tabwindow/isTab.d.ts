/**
 * 判断当前容器环境是否为妙聚窗口 请求参数定义
 * @apiName biz.tabwindow.isTab
 */
export interface IBizTabwindowIsTabParams {
}
/**
 * 判断当前容器环境是否为妙聚窗口 返回结果定义
 * @apiName biz.tabwindow.isTab
 */
export interface IBizTabwindowIsTabResult {
    /** 固定有一个字段result，值为bool，用于指示当前是否为妙聚窗口环境 */
    data: {
        result: boolean;
        [key: string]: any;
    };
    [key: string]: any;
}
/**
 * 判断当前容器环境是否为妙聚窗口
 * @apiName biz.tabwindow.isTab
 * @supportVersion Mac: 6.5.10 Windows: 6.5.10
 * @author Mac：兔仔 Windows： 周镛
 */
export declare function isTab$(params: IBizTabwindowIsTabParams): Promise<IBizTabwindowIsTabResult>;
export default isTab$;
