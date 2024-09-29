/**
 * 暂停播放音频 请求参数定义
 * @apiName device.audio.pause
 */
export interface IDeviceAudioPauseParams {
    [key: string]: any;
}
/**
 * 暂停播放音频 返回结果定义
 * @apiName device.audio.pause
 */
export interface IDeviceAudioPauseResult {
    [key: string]: any;
}
/**
 * 暂停播放音频
 * @apiName device.audio.pause
 * @supportVersion  ios: 2.8.0 android: 2.8.0
 */
export declare function pause$(params: IDeviceAudioPauseParams): Promise<IDeviceAudioPauseResult>;
export default pause$;
