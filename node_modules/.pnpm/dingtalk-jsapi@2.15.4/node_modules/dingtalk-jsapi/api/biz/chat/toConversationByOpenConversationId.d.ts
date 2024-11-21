/**
 * 根据开放会话cid（一次性有效的加密cid）跳转到指定会话 请求参数定义
 * @apiName biz.chat.toConversationByOpenConversationId
 */
export interface IBizChatToConversationByOpenConversationIdParams {
    /** 开放会话cid */
    openConversationId: string;
}
/**
 * 根据开放会话cid（一次性有效的加密cid）跳转到指定会话 返回结果定义
 * @apiName biz.chat.toConversationByOpenConversationId
 */
export interface IBizChatToConversationByOpenConversationIdResult {
}
/**
 * 根据开放会话cid（一次性有效的加密cid）跳转到指定会话
 * @apiName biz.chat.toConversationByOpenConversationId
 * @supportVersion ios: 5.1.30 android: 5.1.30 pc: 5.1.33
 * @author Android：允武 iOS：度尽 Mac：北塔 Windows：秋酷
 */
export declare function toConversationByOpenConversationId$(params: IBizChatToConversationByOpenConversationIdParams): Promise<IBizChatToConversationByOpenConversationIdResult>;
export default toConversationByOpenConversationId$;
