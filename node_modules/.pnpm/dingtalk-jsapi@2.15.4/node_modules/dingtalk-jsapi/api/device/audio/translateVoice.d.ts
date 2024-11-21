/**
 * 音频转文字 请求参数定义
 * @apiName device.audio.translateVoice
 */
export interface IDeviceAudioTranslateVoiceParams {
    [key: string]: any;
}
/**
 * 音频转文字 返回结果定义
 * @apiName device.audio.translateVoice
 */
export interface IDeviceAudioTranslateVoiceResult {
    [key: string]: any;
}
/**
 * 音频转文字
 * @apiName device.audio.translateVoice
 * @supportVersion  ios: 2.8.0 android: 2.8.0
 */
export declare function translateVoice$(params: IDeviceAudioTranslateVoiceParams): Promise<IDeviceAudioTranslateVoiceResult>;
export default translateVoice$;
