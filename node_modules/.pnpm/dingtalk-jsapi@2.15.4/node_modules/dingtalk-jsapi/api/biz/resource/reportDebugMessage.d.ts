/**
 * 通知webview容器开始发送debug消息 请求参数定义
 * @apiName biz.resource.reportDebugMessage
 */
export interface IBizResourceReportDebugMessageParams {
}
/**
 * 通知webview容器开始发送debug消息 返回结果定义
 * @apiName biz.resource.reportDebugMessage
 */
export interface IBizResourceReportDebugMessageResult {
}
/**
 * 通知webview容器开始发送debug消息
 * @apiName biz.resource.reportDebugMessage
 * @supportVersion ios: 6.5.20 android: 6.5.20
 * @author Android 理致 iOS 犹树
 */
export declare function reportDebugMessage$(params: IBizResourceReportDebugMessageParams): Promise<IBizResourceReportDebugMessageResult>;
export default reportDebugMessage$;
