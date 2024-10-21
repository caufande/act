/**
 * 自定义选人组件（多选） 请求参数定义
 * @apiName biz.customContact.multipleChoose
 */
export interface IBizCustomContactMultipleChooseParams {
    [key: string]: any;
}
/**
 * 自定义选人组件（多选） 返回结果定义
 * @apiName biz.customContact.multipleChoose
 */
export interface IBizCustomContactMultipleChooseResult {
    [key: string]: any;
}
/**
 * 自定义选人组件（多选）
 * @apiName biz.customContact.multipleChoose
 * @supportVersion  pc: 3.0.0 ios: 2.4.0 android: 2.4.0
 */
export declare function multipleChoose$(params: IBizCustomContactMultipleChooseParams): Promise<IBizCustomContactMultipleChooseResult>;
export default multipleChoose$;
