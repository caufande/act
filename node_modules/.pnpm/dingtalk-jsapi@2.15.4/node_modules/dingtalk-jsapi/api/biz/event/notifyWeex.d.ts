/**
 * 在iOS端weex的dd-web组件中，调用此JSAPI可以向weex端发送消息 请求参数定义
 * @apiName biz.event.notifyWeex
 */
export interface IBizEventNotifyWeexParams {
    [key: string]: any;
}
/**
 * 在iOS端weex的dd-web组件中，调用此JSAPI可以向weex端发送消息 返回结果定义
 * @apiName biz.event.notifyWeex
 */
export interface IBizEventNotifyWeexResult {
    [key: string]: any;
}
/**
 * 在iOS端weex的dd-web组件中，调用此JSAPI可以向weex端发送消息
 * @apiName biz.event.notifyWeex
 * @supportVersion ios: 4.5.0
 */
export declare function notifyWeex$(params: IBizEventNotifyWeexParams): Promise<IBizEventNotifyWeexResult>;
export default notifyWeex$;
