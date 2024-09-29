import { findDOM } from '../../utils/index.js';
import { CanvasContext } from './CanvasContext.js';

/**
 * 创建 canvas 的绘图上下文 CanvasContext 对象
 */
const createCanvasContext = (canvasId, inst) => {
    const el = findDOM(inst);
    const canvas = el === null || el === void 0 ? void 0 : el.querySelector(`canvas[canvas-id="${canvasId}"]`);
    const ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d');
    const context = new CanvasContext(canvas, ctx);
    if (!ctx)
        return context;
    context.canvas = canvas;
    context.ctx = ctx;
    return context;
};

export { createCanvasContext };
//# sourceMappingURL=createCanvasContext.js.map
