import '../../entry/union';
interface SendMessageArgs {
    /** 应用身份信息 */
    context: {
        /** 应用在开放平台的身份标识 */
        clientId: string;
        /** 组织id */
        corpId: string;
    };
    openConversationIdList: string[];
    /** 要发送的动态卡片数据 */
    sendCardRequest: object;
}
/** 提供以当前用户的身份将卡片消息发送到指定群的能力 */
export declare function sendMessageToGroup(args: SendMessageArgs): Promise<any>;
export {};
