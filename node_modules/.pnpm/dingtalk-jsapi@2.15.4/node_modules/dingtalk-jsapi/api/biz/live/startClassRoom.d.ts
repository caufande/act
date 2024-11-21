/**
 * 提供给ISV发起在线课堂的接口 请求参数定义
 * @apiName biz.live.startClassRoom
 */
export interface IBizLiveStartClassRoomParams {
    startParam: any;
}
/**
 * 提供给ISV发起在线课堂的接口 返回结果定义
 * @apiName biz.live.startClassRoom
 */
export interface IBizLiveStartClassRoomResult {
}
/**
 * 提供给ISV发起在线课堂的接口
 * @apiName biz.live.startClassRoom
 * @supportVersion pc: 5.1.19
 * @author windows:霁明, mac: 霁明
 */
export declare function startClassRoom$(params: IBizLiveStartClassRoomParams): Promise<IBizLiveStartClassRoomResult>;
export default startClassRoom$;
