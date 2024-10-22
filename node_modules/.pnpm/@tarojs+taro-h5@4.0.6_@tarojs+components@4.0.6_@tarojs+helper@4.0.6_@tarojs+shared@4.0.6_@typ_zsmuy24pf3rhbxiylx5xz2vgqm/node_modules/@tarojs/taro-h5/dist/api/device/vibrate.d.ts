import Taro from '@tarojs/api';
/**
 * 使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
 */
declare const vibrateShort: typeof Taro.vibrateShort;
/**
 * 使手机发生较长时间的振动（400 ms)
 */
declare const vibrateLong: typeof Taro.vibrateLong;
export { vibrateShort, vibrateLong };
