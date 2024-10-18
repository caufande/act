/**
 * 下载音频 请求参数定义
 * @apiName device.audio.download
 */
export interface IDeviceAudioDownloadParams {
    [key: string]: any;
}
/**
 * 下载音频 返回结果定义
 * @apiName device.audio.download
 */
export interface IDeviceAudioDownloadResult {
    [key: string]: any;
}
/**
 * 下载音频
 * @apiName device.audio.download
 * @supportVersion  ios: 2.8.0 android: 2.8.0
 */
export declare function download$(params: IDeviceAudioDownloadParams): Promise<IDeviceAudioDownloadResult>;
export default download$;
