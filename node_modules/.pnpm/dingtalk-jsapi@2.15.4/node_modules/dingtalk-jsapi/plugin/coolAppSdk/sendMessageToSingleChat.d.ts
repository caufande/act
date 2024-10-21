import '../../entry/union';
interface SendMessageToSingleChatArgs {
    /** 应用身份信息 */
    context: {
        /** 应用在开放平台的身份标识 */
        clientId: string;
        /** 组织id */
        corpId: string;
    };
    /** 指定用户id */
    userIdList: string[];
    /** 要发送的动态卡片数据 */
    sendCardRequest: object;
}
/** 提供以当前用户的身份将卡片消息发送到指定单聊的能力 */
export declare function sendMessageToSingleChat(args: SendMessageToSingleChatArgs): Promise<any>;
export {};
