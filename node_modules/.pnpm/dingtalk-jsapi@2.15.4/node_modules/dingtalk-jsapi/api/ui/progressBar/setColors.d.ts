/**
 * 设置顶部进度条颜色 请求参数定义
 * @apiName ui.progressBar.setColors
 */
export interface IUiProgressBarSetColorsParams {
    [key: string]: any;
}
/**
 * 设置顶部进度条颜色 返回结果定义
 * @apiName ui.progressBar.setColors
 */
export interface IUiProgressBarSetColorsResult {
    [key: string]: any;
}
/**
 * 设置顶部进度条颜色
 * @apiName ui.progressBar.setColors
 * @supportVersion  ios: 2.4.0 android: 2.4.0
 */
export declare function setColors$(params: IUiProgressBarSetColorsParams): Promise<IUiProgressBarSetColorsResult>;
export default setColors$;
