import Taro from '@tarojs/api';
/**
 * 把当前画布指定区域的内容导出生成指定大小的图片。在 draw() 回调里调用该方法才能保证图片导出成功。
 * @todo 暂未支持尺寸相关功能
 */
declare const canvasToTempFilePath: typeof Taro.canvasToTempFilePath;
export { canvasToTempFilePath };
