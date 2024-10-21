/**
 * 发起公开直播 请求参数定义
 * @apiName biz.live.startUnifiedLive
 */
export interface IBizLiveStartUnifiedLiveParams {
    /** 包含直播类型，以及直播的uuid */
    startParam: any;
}
/**
 * 发起公开直播 返回结果定义
 * @apiName biz.live.startUnifiedLive
 */
export interface IBizLiveStartUnifiedLiveResult {
}
/**
 * 发起公开直播
 * @apiName biz.live.startUnifiedLive
 * @supportVersion ios: 5.1.18 android: 5.1.18
 * @author windows/mac:霁明
 */
export declare function startUnifiedLive$(params: IBizLiveStartUnifiedLiveParams): Promise<IBizLiveStartUnifiedLiveResult>;
export default startUnifiedLive$;
