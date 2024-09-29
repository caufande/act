/**
 *  请求参数定义
 * @apiName ui.nav.preload
 */
export interface IUiNavPreloadParams {
    [key: string]: any;
}
/**
 *  返回结果定义
 * @apiName ui.nav.preload
 */
export interface IUiNavPreloadResult {
    [key: string]: any;
}
/**
 *
 * @apiName ui.nav.preload
 * @supportVersion  ios: 2.6.0 android: 2.6.0
 */
export declare function preload$(params: IUiNavPreloadParams): Promise<IUiNavPreloadResult>;
export default preload$;
