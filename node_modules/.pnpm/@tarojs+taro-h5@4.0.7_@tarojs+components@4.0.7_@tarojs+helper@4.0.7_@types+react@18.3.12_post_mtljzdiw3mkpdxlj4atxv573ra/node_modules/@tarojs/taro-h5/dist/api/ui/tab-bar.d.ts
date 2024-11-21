import Taro from '@tarojs/api';
import { AppConfig } from "@tarojs/api";
declare function initTabBarApis(config?: AppConfig): void;
/**
 * 显示 tabBar 某一项的右上角的红点
 */
declare const showTabBarRedDot: typeof Taro.showTabBarRedDot;
/**
 * 显示 tabBar
 */
declare const showTabBar: typeof Taro.showTabBar;
/**
 * 动态设置 tabBar 的整体样式
 */
declare const setTabBarStyle: typeof Taro.setTabBarStyle;
/**
 * 动态设置 tabBar 某一项的内容
 */
declare const setTabBarItem: typeof Taro.setTabBarItem;
/**
 * 为 tabBar 某一项的右上角添加文本
 */
declare const setTabBarBadge: typeof Taro.setTabBarBadge;
/**
 * 移除 tabBar 某一项右上角的文本
 */
declare const removeTabBarBadge: typeof Taro.removeTabBarBadge;
/**
 * 隐藏 tabBar 某一项的右上角的红点
 */
declare const hideTabBarRedDot: typeof Taro.hideTabBarRedDot;
/**
 * 隐藏 tabBar
 */
declare const hideTabBar: typeof Taro.hideTabBar;
export { initTabBarApis, showTabBarRedDot, showTabBar, setTabBarStyle, setTabBarItem, setTabBarBadge, removeTabBarBadge, hideTabBarRedDot, hideTabBar };
