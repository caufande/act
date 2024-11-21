/**
 * 根据userId获取发送消息的会话cidToken 请求参数定义
 * @apiName biz.chat.getRealmCid
 */
export interface IBizChatGetRealmCidParams {
    /** 指定对象的userId(staffId) */
    userId: string;
    /** 指定对象所归属的企业Id */
    corpId: string;
}
/**
 * 根据userId获取发送消息的会话cidToken 返回结果定义
 * @apiName biz.chat.getRealmCid
 */
export interface IBizChatGetRealmCidResult {
    /** 会话发送消息的cidToken */
    cid: string;
}
/**
 * 根据userId获取发送消息的会话cidToken
 * @apiName biz.chat.getRealmCid
 * @supportVersion ios: 4.7.12 android: 4.7.12 win: 4.7.12  mac 暂不支持
 * @author android：笔歌，ios：怒龙，win：秋裤
 */
export declare function getRealmCid$(params: IBizChatGetRealmCidParams): Promise<IBizChatGetRealmCidResult>;
export default getRealmCid$;
