import { temporarilyNotSupport } from '../../utils/index.js';
export { createCanvasContext } from './createCanvasContext.js';
export { canvasToTempFilePath } from './canvasToTempFilePath.js';
export { canvasPutImageData } from './canvasPutImageData.js';
export { canvasGetImageData } from './canvasGetImageData.js';

// 画布
/** 创建离屏 canvas 实例 */
const createOffscreenCanvas = /* @__PURE__ */ temporarilyNotSupport('createOffscreenCanvas');

export { createOffscreenCanvas };
//# sourceMappingURL=index.js.map
