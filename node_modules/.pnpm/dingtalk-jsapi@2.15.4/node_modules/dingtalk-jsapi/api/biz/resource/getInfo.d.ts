/**
 * 获取离线包信息 请求参数定义
 * @apiName biz.resource.getInfo
 */
export interface IBizResourceGetInfoParams {
}
/**
 * 获取离线包信息 返回结果定义
 * @apiName biz.resource.getInfo
 */
export interface IBizResourceGetInfoResult {
    /** prepare：命中离线包，但离线包当前不可用;enable：离线包当前生效;disable：离线包不可用（包括无效的dd_mini_app_id、离线包已过期，通过 JSAPI disable 等） */
    status: string;
    /** 离线包信息;仅在 status 为 enable 时下发;*/
    detail: {
        version: string;
        id: string;
        expireTimestamp: string;
        [key: string]: any;
    };
}
/**
 * 获取离线包信息
 * @apiName biz.resource.getInfo
 * @supportVersion ios: 6.5.10 android: 6.5.10
 * @author Android：理致 iOS：犹树
 */
export declare function getInfo$(params: IBizResourceGetInfoParams): Promise<IBizResourceGetInfoResult>;
export default getInfo$;
