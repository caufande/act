import '../../entry/union';
interface BatchInstallCoolAppArgs {
    /** 酷应用 code */
    coolAppCode: string;
    /** 酷应用在开放平台的身份标识 */
    clientId: string;
    /** 组织id */
    corpId: string;
    /** 是否安装到单聊会话 */
    isSingleChat: boolean;
}
export declare function batchInstallCoolApp(args: BatchInstallCoolAppArgs): Promise<any>;
export {};
