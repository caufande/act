/**
 * 打开某个用户的聊天页面，如果没有，创建会话 请求参数定义
 * @apiName biz.chat.openSingleChat
 */
export interface IBizChatOpenSingleChatParams {
    /** 企业id */
    corpId: string;
    /** 用户的工号 */
    userId: string;
}
/**
 * 打开某个用户的聊天页面，如果没有，创建会话 返回结果定义
 * @apiName biz.chat.openSingleChat
 */
export interface IBizChatOpenSingleChatResult {
}
/**
 * 打开与某个用户的聊天页面（单聊会话）
 * @apiName biz.chat.openSingleChat
 * @supportVersion  ios: 3.4.10 android: 3.4.10
 */
export declare function openSingleChat$(params: IBizChatOpenSingleChatParams): Promise<IBizChatOpenSingleChatResult>;
export default openSingleChat$;
