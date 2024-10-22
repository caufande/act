/**
 * 暂停之后继续播放音频 请求参数定义
 * @apiName device.audio.resume
 */
export interface IDeviceAudioResumeParams {
    [key: string]: any;
}
/**
 * 暂停之后继续播放音频 返回结果定义
 * @apiName device.audio.resume
 */
export interface IDeviceAudioResumeResult {
    [key: string]: any;
}
/**
 * 暂停之后继续播放音频
 * @apiName device.audio.resume
 * @supportVersion  ios: 2.8.0 android: 2.8.0
 */
export declare function resume$(params: IDeviceAudioResumeParams): Promise<IDeviceAudioResumeResult>;
export default resume$;
