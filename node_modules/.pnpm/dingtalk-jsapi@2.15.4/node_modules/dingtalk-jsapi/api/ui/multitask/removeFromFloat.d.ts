/**
 * 从浮窗移除 请求参数定义
 * @apiName ui.multitask.removeFromFloat
 */
export interface IUiMultitaskRemoveFromFloatParams {
    /** 要删除的浮窗id */
    id: string;
}
/**
 * 从浮窗移除 返回结果定义
 * @apiName ui.multitask.removeFromFloat
 */
export interface IUiMultitaskRemoveFromFloatResult {
}
/**
 * 从浮窗移除
 * @apiName ui.multitask.removeFromFloat
 * @supportVersion ios: 6.5.0 android: 6.5.0
 * @author Android：零封 iOS：无最
 */
export declare function removeFromFloat$(params: IUiMultitaskRemoveFromFloatParams): Promise<IUiMultitaskRemoveFromFloatResult>;
export default removeFromFloat$;
