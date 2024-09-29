/**
 * 保持录音 请求参数定义
 * @apiName media.voiceRecorder.keepAlive
 */
export interface IMediaVoiceRecorderKeepAliveParams {
    [key: string]: any;
}
/**
 * 保持录音 返回结果定义
 * @apiName media.voiceRecorder.keepAlive
 */
export interface IMediaVoiceRecorderKeepAliveResult {
    [key: string]: any;
}
/**
 * 保持录音
 * @apiName media.voiceRecorder.keepAlive
 * @supportVersion ios: 5.1.12 android: 5.1.12
 */
export declare function keepAlive$(params: IMediaVoiceRecorderKeepAliveParams): Promise<IMediaVoiceRecorderKeepAliveResult>;
export default keepAlive$;
