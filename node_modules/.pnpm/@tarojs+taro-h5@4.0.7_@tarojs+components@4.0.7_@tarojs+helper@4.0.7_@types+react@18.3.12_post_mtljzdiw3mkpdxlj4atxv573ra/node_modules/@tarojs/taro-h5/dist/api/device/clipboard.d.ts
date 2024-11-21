/**
 * 剪贴板部分的api参考了Chameleon项目的实现：
 *
 * setClipboardData: https://github.com/chameleon-team/chameleon-api/tree/master/src/interfaces/setClipBoardData
 * getClipboardData: https://github.com/chameleon-team/chameleon-api/tree/master/src/interfaces/getClipBoardData
 */
import Taro from '@tarojs/api';
/**
 * 设置系统剪贴板的内容
 */
declare const setClipboardData: typeof Taro.setClipboardData;
/**
 * 获取系统剪贴板的内容
 */
declare const getClipboardData: typeof Taro.getClipboardData;
export { setClipboardData, getClipboardData };
