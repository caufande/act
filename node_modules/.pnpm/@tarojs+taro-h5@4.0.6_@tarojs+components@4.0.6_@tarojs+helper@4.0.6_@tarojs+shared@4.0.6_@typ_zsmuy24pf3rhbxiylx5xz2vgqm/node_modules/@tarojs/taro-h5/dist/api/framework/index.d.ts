import Taro from '@tarojs/api';
declare const getApp: typeof Taro.getApp;
declare const getCurrentInstance: () => Taro.getCurrentInstance.Current;
export { getApp, getCurrentInstance };
export { getCurrentPages } from '@tarojs/router';
