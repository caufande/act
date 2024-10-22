import Taro from '@tarojs/api';
/**
 * 将像素数据绘制到画布。在自定义组件下，第二个参数传入自定义组件实例 this，以操作组件内 <canvas> 组件
 * @todo 暂未支持尺寸相关功能
 */
declare const canvasPutImageData: typeof Taro.canvasPutImageData;
export { canvasPutImageData };
