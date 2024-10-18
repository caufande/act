import Taro from '@tarojs/api';
declare const openVideoEditor: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
/**
 * 创建 video 上下文 VideoContext 对象。
 */
declare const createVideoContext: typeof Taro.createVideoContext;
declare const compressVideo: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
export * from "./saveVideoToPhotosAlbum.js";
export { openVideoEditor, createVideoContext, compressVideo };
export * from "./getVideoInfo.js";
export * from "./chooseMedia.js";
export * from "./chooseVideo.js";
