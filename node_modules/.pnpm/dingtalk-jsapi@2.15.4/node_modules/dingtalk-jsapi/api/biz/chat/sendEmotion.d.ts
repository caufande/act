/**
 * 发送表情。调用js-api后会唤起选会话组件，用户选择发送的会话，确认后发送。 请求参数定义
 * imageUrl和mediaId二选一 authMediaId配合mediaId，可选
 * @apiName biz.chat.sendEmotion
 */
export interface IBizChatSendEmotionParams {
    /** 表情图片链接 */
    imageUrl?: string;
    /** 表情图片mediaId */
    mediaId?: string;
    /** 表情图片authMediaId  */
    authMediaId?: string;
}
/**
 * 发送表情。调用js-api后会唤起选会话组件，用户选择发送的会话，确认后发送。 返回结果定义
 * @apiName biz.chat.sendEmotion
 */
export interface IBizChatSendEmotionResult {
}
/**
 * 发送表情。调用js-api后会唤起选会话组件，用户选择发送的会话，确认后发送。
 * @apiName biz.chat.sendEmotion
 * @supportVersion ios: 4.6.12 android: 4.6.12
 */
export declare function sendEmotion$(params: IBizChatSendEmotionParams): Promise<IBizChatSendEmotionResult>;
export default sendEmotion$;
