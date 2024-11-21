/**
 * 选群组 请求参数定义
 * @apiName biz.chat.pickConversation
 */
export interface IBizChatPickConversationParams {
    /** 企业id */
    corpId: string;
    /** 是否弹出确认窗口，默认为true */
    isConfirm: string;
}
/**
 * 选群组 返回结果定义
 * @apiName biz.chat.pickConversation
 */
export interface IBizChatPickConversationResult {
    /** 该cid和服务端开发文档-普通会话消息接口配合使用，而且只能使用一次，之后将失效 */
    cid: string;
    /** 会话标题 */
    title: string;
}
/**
 * 选群组
 * @description corpid必须是用户所属的企业的corpid
 * @apiName biz.chat.pickConversation
 * @supportVersion  ios: 2.4.2 android: 2.4.2
 */
export declare function pickConversation$(params: IBizChatPickConversationParams): Promise<IBizChatPickConversationResult>;
export default pickConversation$;
