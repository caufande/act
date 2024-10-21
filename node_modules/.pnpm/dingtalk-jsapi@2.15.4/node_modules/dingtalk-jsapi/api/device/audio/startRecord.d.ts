/**
 * 开始录制音频 请求参数定义
 * @apiName device.audio.startRecord
 */
export interface IDeviceAudioStartRecordParams {
    [key: string]: any;
}
/**
 * 开始录制音频 返回结果定义
 * @apiName device.audio.startRecord
 */
export interface IDeviceAudioStartRecordResult {
    [key: string]: any;
}
/**
 * 开始录制音频
 * @apiName device.audio.startRecord
 * @supportVersion  ios: 2.8.0 android: 2.8.0
 */
export declare function startRecord$(params: IDeviceAudioStartRecordParams): Promise<IDeviceAudioStartRecordResult>;
export default startRecord$;
