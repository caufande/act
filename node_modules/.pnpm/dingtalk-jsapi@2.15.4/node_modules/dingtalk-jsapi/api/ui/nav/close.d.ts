/**
 *  请求参数定义
 * @apiName ui.nav.close
 */
export interface IUiNavCloseParams {
    [key: string]: any;
}
/**
 *  返回结果定义
 * @apiName ui.nav.close
 */
export interface IUiNavCloseResult {
    [key: string]: any;
}
/**
 *
 * @apiName ui.nav.close
 * @supportVersion  ios: 2.6.0 android: 2.6.0
 */
export declare function close$(params: IUiNavCloseParams): Promise<IUiNavCloseResult>;
export default close$;
