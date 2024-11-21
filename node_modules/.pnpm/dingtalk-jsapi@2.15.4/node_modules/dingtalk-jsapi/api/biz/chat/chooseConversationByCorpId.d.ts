/**
 * 选择企业会话 请求参数定义
 * @apiName biz.chat.chooseConversationByCorpId
 */
export interface IBizChatChooseConversationByCorpIdParams {
    /** 企业id */
    corpId: string;
    /** 是否允许创建会话, 仅支持移动端 */
    isAllowCreateGroup?: boolean;
    /** 是否限制为自己创建的会话，仅支持移动端  */
    filterNotOwnerGroup?: boolean;
}
/**
 * 选择企业会话 返回结果定义
 * @apiName biz.chat.chooseConversationByCorpId
 */
export interface IBizChatChooseConversationByCorpIdResult {
    /** 会话id（该会话cid永久有效） */
    chatId: string;
    /** 会话标题 */
    title: string;
}
/**
 * 选择企业会话
 * @description corpid必须是用户所属的企业的corpid
 * @apiName biz.chat.chooseConversationByCorpId
 * @supportVersion  ios: 2.6.0 android: 2.6.0 pc: 4.7.11
 * @author Win：伏檀; Mac：北塔
 */
export declare function chooseConversationByCorpId$(params: IBizChatChooseConversationByCorpIdParams): Promise<IBizChatChooseConversationByCorpIdResult>;
export default chooseConversationByCorpId$;
