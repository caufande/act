/**
 * 停止录制音频 请求参数定义
 * @apiName device.audio.stopRecord
 */
export interface IDeviceAudioStopRecordParams {
    [key: string]: any;
}
/**
 * 停止录制音频 返回结果定义
 * @apiName device.audio.stopRecord
 */
export interface IDeviceAudioStopRecordResult {
    [key: string]: any;
}
/**
 * 停止录制音频
 * @apiName device.audio.stopRecord
 * @supportVersion  ios: 2.8.0 android: 2.8.0
 */
export declare function stopRecord$(params: IDeviceAudioStopRecordParams): Promise<IDeviceAudioStopRecordResult>;
export default stopRecord$;
