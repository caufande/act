/**
 * 播放音频 请求参数定义
 * @apiName device.audio.play
 */
export interface IDeviceAudioPlayParams {
    [key: string]: any;
}
/**
 * 播放音频 返回结果定义
 * @apiName device.audio.play
 */
export interface IDeviceAudioPlayResult {
    [key: string]: any;
}
/**
 * 播放音频
 * @apiName device.audio.play
 * @supportVersion  ios: 2.8.0 android: 2.8.0
 */
export declare function play$(params: IDeviceAudioPlayParams): Promise<IDeviceAudioPlayResult>;
export default play$;
