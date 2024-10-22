/**
 *  请求参数定义
 * @apiName ui.nav.recycle
 */
export interface IUiNavRecycleParams {
    [key: string]: any;
}
/**
 *  返回结果定义
 * @apiName ui.nav.recycle
 */
export interface IUiNavRecycleResult {
    [key: string]: any;
}
/**
 *
 * @apiName ui.nav.recycle
 * @supportVersion  ios: 2.6.0 android: 2.6.0
 */
export declare function recycle$(params: IUiNavRecycleParams): Promise<IUiNavRecycleResult>;
export default recycle$;
