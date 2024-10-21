/**
 * 大客户业务应用订阅事件 请求参数定义
 * @apiName biz.realm.subscribe
 */
export interface IBizRealmSubscribeParams {
    channel: string;
}
/**
 * 大客户业务应用订阅事件 返回结果定义
 * @apiName biz.realm.subscribe
 */
export interface IBizRealmSubscribeResult {
    /** map形态的内容，和具体客户约定具体格式 */
    data: any;
}
/**
 * 大客户业务应用订阅事件
 * @apiName biz.realm.subscribe
 * @supportVersion ios: 4.7.18 android: 4.7.18
 * @author Android ：笔歌; IOS： 怒龙
 */
export declare function subscribe$(params: IBizRealmSubscribeParams): Promise<IBizRealmSubscribeResult>;
export default subscribe$;
