/**
 * 输入框（单行） 请求参数定义
 * @apiName ui.input.plain
 */
export interface IUiInputPlainParams {
    [key: string]: any;
}
/**
 * 输入框（单行） 返回结果定义
 * @apiName ui.input.plain
 */
export interface IUiInputPlainResult {
    [key: string]: any;
}
/**
 * 输入框（单行）
 * @apiName ui.input.plain
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function plain$(params: IUiInputPlainParams): Promise<IUiInputPlainResult>;
export default plain$;
