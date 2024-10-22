/**
 * 取消订阅专属sdk事件 请求参数定义
 * @apiName biz.realm.unsubscribe
 */
export interface IBizRealmUnsubscribeParams {
    channel: string;
}
/**
 * 取消订阅专属sdk事件 返回结果定义
 * @apiName biz.realm.unsubscribe
 */
export interface IBizRealmUnsubscribeResult {
}
/**
 * 取消订阅专属sdk事件
 * @apiName biz.realm.unsubscribe
 * @supportVersion ios: 4.7.18 android: 4.7.18
 * @author Android ：笔歌; IOS： 怒龙
 */
export declare function unsubscribe$(params: IBizRealmUnsubscribeParams): Promise<IBizRealmUnsubscribeResult>;
export default unsubscribe$;
