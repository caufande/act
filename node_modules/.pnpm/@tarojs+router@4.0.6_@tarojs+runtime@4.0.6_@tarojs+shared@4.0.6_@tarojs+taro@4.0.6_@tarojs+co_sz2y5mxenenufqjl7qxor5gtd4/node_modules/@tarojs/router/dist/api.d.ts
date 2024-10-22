import Taro from '@tarojs/taro';
export declare function navigateTo(option: Taro.navigateTo.Option): ReturnType<typeof Taro.navigateTo>;
export declare function redirectTo(option: Taro.redirectTo.Option): ReturnType<typeof Taro.redirectTo>;
export declare function navigateBack(option?: Taro.navigateBack.Option): ReturnType<typeof Taro.navigateBack>;
export declare function switchTab(option: Taro.switchTab.Option): ReturnType<typeof Taro.switchTab>;
export declare function reLaunch(option: Taro.reLaunch.Option): ReturnType<typeof Taro.reLaunch>;
export declare function getCurrentPages(): Taro.Page[];
