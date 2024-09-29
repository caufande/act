/**
 *  请求参数定义
 * @apiName ui.nav.go
 */
export interface IUiNavGoParams {
    [key: string]: any;
}
/**
 *  返回结果定义
 * @apiName ui.nav.go
 */
export interface IUiNavGoResult {
    [key: string]: any;
}
/**
 *
 * @apiName ui.nav.go
 * @supportVersion  ios: 2.6.0 android: 2.6.0
 */
export declare function go$(params: IUiNavGoParams): Promise<IUiNavGoResult>;
export default go$;
