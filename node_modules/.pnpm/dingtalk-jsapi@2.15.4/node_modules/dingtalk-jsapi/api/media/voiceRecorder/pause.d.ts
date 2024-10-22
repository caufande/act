/**
 * 暂停录音 请求参数定义
 * @apiName media.voiceRecorder.pause
 */
export interface IMediaVoiceRecorderPauseParams {
    [key: string]: any;
}
/**
 * 暂停录音 返回结果定义
 * @apiName media.voiceRecorder.pause
 */
export interface IMediaVoiceRecorderPauseResult {
    [key: string]: any;
}
/**
 * 暂停录音
 * @apiName media.voiceRecorder.pause
 * @supportVersion ios: 5.1.12 android: 5.1.12
 */
export declare function pause$(params: IMediaVoiceRecorderPauseParams): Promise<IMediaVoiceRecorderPauseResult>;
export default pause$;
