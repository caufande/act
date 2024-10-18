/**
 * 创建场景群 请求参数定义
 * @apiName biz.chat.createSceneGroup
 */
export interface IBizChatCreateSceneGroupParams {
    corpId: string;
    /** 群名称 */
    title?: string;
    /** 群头像url地址 */
    avatar?: string;
    /** 群类型，1:年会大群;2:筹备群 */
    type?: number;
    extension?: {
        [key: string]: string;
    };
}
/**
 * 创建场景群 返回结果定义
 * @apiName biz.chat.createSceneGroup
 */
export interface IBizChatCreateSceneGroupResult {
    /** 会话Id */
    chatId: string;
}
/**
 * 创建场景群
 * @apiName biz.chat.createSceneGroup
 * @supportVersion ios: 4.7.17 android: 4.7.17 pc:4.7.17
 * @author windows: 仟晨 mac: 舒绎 android: 峰砺 iOS: 鱼非
 */
export declare function createSceneGroup$(params: IBizChatCreateSceneGroupParams): Promise<IBizChatCreateSceneGroupResult>;
export default createSceneGroup$;
