/**
 * 自定义选人组件 请求参数定义
 * @apiName biz.customContact.choose
 */
export interface IBizCustomContactChooseParams {
    [key: string]: any;
}
/**
 * 自定义选人组件 返回结果定义
 * @apiName biz.customContact.choose
 */
export interface IBizCustomContactChooseResult {
    [key: string]: any;
}
/**
 * 自定义选人组件
 * @apiName biz.customContact.choose
 * @supportVersion  pc: 3.0.0 ios: 2.5.2 android: 2.5.2
 */
export declare function choose$(params: IBizCustomContactChooseParams): Promise<IBizCustomContactChooseResult>;
export default choose$;
