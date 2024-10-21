import '../../entry/union';
interface InstallCoolAppToGroupArgs {
    /** 酷应用 code */
    coolAppCode: string;
    /** 酷应用在开放平台的身份标识 */
    clientId: string;
    /** 组织id */
    corpId: string;
}
export declare function installCoolAppToGroup(args: InstallCoolAppToGroupArgs): Promise<any>;
export {};
