/**
 * 添加到浮窗 请求参数定义
 * @apiName ui.multitask.addToFloat
 */
export interface IUiMultitaskAddToFloatParams {
    /** 默认值：小程序：默认icon H5：OGP image */
    icon?: string;
    /** 默认值：小程序：defaultTitle H5：OGP title */
    title?: string;
    /** 默认值：小程序：当前page H5：OGP description或当前url */
    content?: string;
}
/**
 * 添加到浮窗 返回结果定义
 * @apiName ui.multitask.addToFloat
 */
export interface IUiMultitaskAddToFloatResult {
    /** 浮窗ID，delete时需要使用 */
    id: string;
}
/**
 * 添加到浮窗
 * @apiName ui.multitask.addToFloat
 * @supportVersion ios: 6.5.0 android: 6.5.0
 * @author Android：零封 iOS：无最
 */
export declare function addToFloat$(params: IUiMultitaskAddToFloatParams): Promise<IUiMultitaskAddToFloatResult>;
export default addToFloat$;
