import '../../entry/union';
interface CreateGroupArgs {
    /** 群名称 */
    title: string;
    /** 群成员 id */
    memberUserIds: string[];
    /** 创建群的唯一标识符 */
    groupUniqId?: string;
    /** 群的相关配置 */
    managementOptions?: {
        /** 入群需验证(0：不入群验证（默认） 1：入群验证) */
        validationType: number;
        /** 仅群主和管理员可atAll （0-默认所有人，1-仅群主可@all） */
        mentionAllAuthority: number;
    };
    /** 酷应用身份信息 */
    context: {
        /** 酷应用 code */
        coolAppCode: string;
        /** 酷应用在开放平台的身份标识 */
        clientId: string;
        /** 组织id */
        corpId: string;
    };
}
export declare function createGroup(args: CreateGroupArgs): Promise<any>;
export {};
