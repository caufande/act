import Taro from '@tarojs/api';
/**
 * 设置窗口大小，该接口仅适用于 PC 平台，使用细则请参见指南
 */
declare const setWindowSize: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
/**
 * 监听窗口尺寸变化事件
 */
declare const onWindowResize: typeof Taro.onWindowResize;
/**
 * 取消监听窗口尺寸变化事件
 */
declare const offWindowResize: typeof Taro.offWindowResize;
declare const checkIsPictureInPictureActive: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
export { setWindowSize, onWindowResize, offWindowResize, checkIsPictureInPictureActive };
