/**
 * 下拉多选 请求参数定义
 * @apiName biz.util.multiSelect
 */
export interface IBizUtilMultiSelectParams {
    /** 待选项列表 */
    options: string[];
    /** 已选选项列表 */
    selectOption: string[];
}
/**
 * 下拉多选 返回结果定义
 * 返回用户选中的index数组，从0开始。 例如 [ 2, 3 ]
 * @apiName biz.util.multiSelect
 */
export declare type IBizUtilMultiSelectResult = string[];
/**
 * 下拉多选
 * 依赖钉钉客户端版本v3.0.0
 * @apiName biz.util.multiSelect
 * @supportVersion  ios: 3.0.0 android: 3.0.0
 */
export declare function multiSelect$(params: IBizUtilMultiSelectParams): Promise<IBizUtilMultiSelectResult>;
export default multiSelect$;
