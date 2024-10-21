import Taro from '@tarojs/api';
/**
 * 开始下拉刷新。调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。
 */
declare const startPullDownRefresh: typeof Taro.startPullDownRefresh;
/**
 * 停止当前页面下拉刷新。
 */
declare const stopPullDownRefresh: typeof Taro.stopPullDownRefresh;
export { startPullDownRefresh, stopPullDownRefresh };
