import '../../entry/union';
interface AddMembersArgs {
    /** 酷应用身份信息 code */
    context: {
        /** 酷应用 code */
        coolAppCode: string;
        /** 酷应用在开放平台的身份标识 */
        clientId: string;
        /** 组织idid */
        corpId: string;
    };
    /** 要添加成员的的群id */
    openConversationList: string[];
    /** 需要入群的成员 userid */
    userIds: string[];
}
/** 群聊内添加群成员的能力 */
export declare function addMembers(args: AddMembersArgs): Promise<any>;
export {};
