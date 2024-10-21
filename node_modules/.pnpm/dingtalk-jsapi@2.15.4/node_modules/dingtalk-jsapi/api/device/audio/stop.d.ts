/**
 * 停止播放音频 请求参数定义
 * @apiName device.audio.stop
 */
export interface IDeviceAudioStopParams {
    [key: string]: any;
}
/**
 * 停止播放音频 返回结果定义
 * @apiName device.audio.stop
 */
export interface IDeviceAudioStopResult {
    [key: string]: any;
}
/**
 * 停止播放音频
 * @apiName device.audio.stop
 * @supportVersion  ios: 2.8.0 android: 2.8.0
 */
export declare function stop$(params: IDeviceAudioStopParams): Promise<IDeviceAudioStopResult>;
export default stop$;
