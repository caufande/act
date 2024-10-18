/**
 * 跳转会话 请求参数定义
 * @apiName biz.chat.toConversation
 */
export interface IBizChatToConversationParams {
    /** 企业id */
    corpId: string;
    /** 会话Id */
    chatId: string;
}
/**
 * 跳转会话 返回结果定义
 * @apiName biz.chat.toConversation
 */
export interface IBizChatToConversationResult {
}
/**
 * 根据chatId跳转到对应会话
 * @description corpid必须是用户所属的企业的corpid
 * @apiName biz.chat.toConversation
 * @supportVersion  ios: 2.6.0 android: 2.6.0
 */
export declare function toConversation$(params: IBizChatToConversationParams): Promise<IBizChatToConversationResult>;
export default toConversation$;
