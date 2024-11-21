/**
 * 停止录音 请求参数定义
 * @apiName media.voiceRecorder.stop
 */
export interface IMediaVoiceRecorderStopParams {
    [key: string]: any;
}
/**
 * 停止录音 返回结果定义
 * @apiName media.voiceRecorder.stop
 */
export interface IMediaVoiceRecorderStopResult {
    [key: string]: any;
}
/**
 * 停止录音
 * @apiName media.voiceRecorder.stop
 * @supportVersion ios: 5.1.12 android: 5.1.12
 */
export declare function stop$(params: IMediaVoiceRecorderStopParams): Promise<IMediaVoiceRecorderStopResult>;
export default stop$;
