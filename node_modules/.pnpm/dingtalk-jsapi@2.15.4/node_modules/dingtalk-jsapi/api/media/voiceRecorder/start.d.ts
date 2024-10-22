/**
 * 开始录音 请求参数定义
 * @apiName media.voiceRecorder.start
 */
export interface IMediaVoiceRecorderStartParams {
    [key: string]: any;
}
/**
 * 开始录音 返回结果定义
 * @apiName media.voiceRecorder.start
 */
export interface IMediaVoiceRecorderStartResult {
    [key: string]: any;
}
/**
 * 开始录音
 * @apiName media.voiceRecorder.start
 * @supportVersion ios: 5.1.12 android: 5.1.12
 */
export declare function start$(params: IMediaVoiceRecorderStartParams): Promise<IMediaVoiceRecorderStartResult>;
export default start$;
