/**
 * 监听播放音频停止的事件接口 请求参数定义
 * @apiName device.audio.onPlayEnd
 */
export interface IDeviceAudioOnPlayEndParams {
    [key: string]: any;
}
/**
 * 监听播放音频停止的事件接口 返回结果定义
 * @apiName device.audio.onPlayEnd
 */
export interface IDeviceAudioOnPlayEndResult {
    [key: string]: any;
}
/**
 * 监听播放音频停止的事件接口
 * @apiName device.audio.onPlayEnd
 * @supportVersion  ios: 2.8.0 android: 2.8.0
 */
export declare function onPlayEnd$(params: IDeviceAudioOnPlayEndParams): Promise<IDeviceAudioOnPlayEndResult>;
export default onPlayEnd$;
