/**
 * 收藏表情(支持批量) 请求参数定义
 * @apiName biz.chat.collectSticker
 */
export interface IBizChatCollectStickerParams {
    /** 表情url数组 */
    stickerUrls: string[];
}
/**
 * 收藏表情(支持批量) 返回结果定义
 * @apiName biz.chat.collectSticker
 */
export interface IBizChatCollectStickerResult {
}
/**
 * 收藏表情(支持批量)
 * @apiName biz.chat.collectSticker
 * @supportVersion ios: 4.6.25 android: 4.6.25
 */
export declare function collectSticker$(params: IBizChatCollectStickerParams): Promise<IBizChatCollectStickerResult>;
export default collectSticker$;
