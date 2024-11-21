/**
 * 增加桌面快捷方式 请求参数定义
 * @apiName biz.shortCut.addShortCut
 */
export interface IBizShortCutAddShortCutParams {
    name: string;
    corpId: string;
    agentId: number;
}
/**
 * 增加桌面快捷方式 返回结果定义
 * @apiName biz.shortCut.addShortCut
 */
export interface IBizShortCutAddShortCutResult {
}
/**
 * 增加桌面快捷方式
 * @apiName biz.shortCut.addShortCut
 * @supportVersion android: 4.7.32
 * @author android: 攸元
 */
export declare function addShortCut$(params: IBizShortCutAddShortCutParams): Promise<IBizShortCutAddShortCutResult>;
export default addShortCut$;
