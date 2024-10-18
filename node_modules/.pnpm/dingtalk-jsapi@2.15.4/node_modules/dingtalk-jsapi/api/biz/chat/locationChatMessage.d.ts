/**
 * 未知 请求参数定义
 * @apiName biz.chat.locationChatMessage
 */
export interface IBizChatLocationChatMessageParams {
    [key: string]: any;
}
/**
 * 未知 返回结果定义
 * @apiName biz.chat.locationChatMessage
 */
export interface IBizChatLocationChatMessageResult {
    [key: string]: any;
}
/**
 * 未知
 * @apiName biz.chat.locationChatMessage
 * @supportVersion  ios: 2.7.6 android: 2.7.6
 */
export declare function locationChatMessage$(params: IBizChatLocationChatMessageParams): Promise<IBizChatLocationChatMessageResult>;
export default locationChatMessage$;
