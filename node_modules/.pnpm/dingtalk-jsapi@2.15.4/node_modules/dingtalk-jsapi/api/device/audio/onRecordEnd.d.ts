/**
 * 监听录音自动停止 请求参数定义
 * @apiName device.audio.onRecordEnd
 */
export interface IDeviceAudioOnRecordEndParams {
    [key: string]: any;
}
/**
 * 监听录音自动停止 返回结果定义
 * @apiName device.audio.onRecordEnd
 */
export interface IDeviceAudioOnRecordEndResult {
    [key: string]: any;
}
/**
 * 监听录音自动停止
 * @apiName device.audio.onRecordEnd
 * @supportVersion  ios: 2.8.0 android: 2.8.0
 */
export declare function onRecordEnd$(params: IDeviceAudioOnRecordEndParams): Promise<IDeviceAudioOnRecordEndResult>;
export default onRecordEnd$;
