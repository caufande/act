/**
 * 退出模态框或者侧边框 请求参数定义
 * @apiName biz.navigation.quit
 */
export interface IBizNavigationQuitParams {
    [key: string]: any;
}
/**
 * 退出模态框或者侧边框 返回结果定义
 * @apiName biz.navigation.quit
 */
export interface IBizNavigationQuitResult {
    [key: string]: any;
}
/**
 * 退出模态框或者侧边框
 * @apiName biz.navigation.quit
 * @supportVersion  pc: 2.5.0
 */
export declare function quit$(params: IBizNavigationQuitParams): Promise<IBizNavigationQuitResult>;
export default quit$;
