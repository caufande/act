/**
 * 恢复录音 请求参数定义
 * @apiName media.voiceRecorder.resume
 */
export interface IMediaVoiceRecorderResumeParams {
    [key: string]: any;
}
/**
 * 恢复录音 返回结果定义
 * @apiName media.voiceRecorder.resume
 */
export interface IMediaVoiceRecorderResumeResult {
    [key: string]: any;
}
/**
 * 恢复录音
 * @apiName media.voiceRecorder.resume
 * @supportVersion ios: 5.1.12 android: 5.1.12
 */
export declare function resume$(params: IMediaVoiceRecorderResumeParams): Promise<IMediaVoiceRecorderResumeResult>;
export default resume$;
