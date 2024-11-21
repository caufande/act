import Taro from '@tarojs/api';
/**
 * 停止监听罗盘数据
 */
declare const stopCompass: typeof Taro.stopCompass;
/**
 * 开始监听罗盘数据
 */
declare const startCompass: typeof Taro.startCompass;
/**
 * 监听罗盘数据变化事件。频率：5 次/秒，接口调用后会自动开始监听，可使用 wx.stopCompass 停止监听。
 */
declare const onCompassChange: typeof Taro.onCompassChange;
/**
 * 取消监听罗盘数据变化事件，参数为空，则取消所有的事件监听。
 */
declare const offCompassChange: typeof Taro.offCompassChange;
export { stopCompass, startCompass, onCompassChange, offCompassChange };
