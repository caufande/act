/**
 *  请求参数定义
 * @apiName ui.nav.getCurrentId
 */
export interface IUiNavGetCurrentIdParams {
    [key: string]: any;
}
/**
 *  返回结果定义
 * @apiName ui.nav.getCurrentId
 */
export interface IUiNavGetCurrentIdResult {
    [key: string]: any;
}
/**
 *
 * @apiName ui.nav.getCurrentId
 * @supportVersion  ios: 2.6.0 android: 2.6.0
 */
export declare function getCurrentId$(params: IUiNavGetCurrentIdParams): Promise<IUiNavGetCurrentIdResult>;
export default getCurrentId$;
