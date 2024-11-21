/** 创建离屏 canvas 实例 */
declare const createOffscreenCanvas: (option?: {}, ...args: any[]) => Promise<Partial<TaroGeneral.CallbackResult> & Record<string, unknown> & TaroGeneral.CallbackResult>;
export { createOffscreenCanvas };
/** 创建 canvas 的绘图上下文 CanvasContext 对象 */
export * from "./createCanvasContext.js";
/** 把当前画布指定区域的内容导出生成指定大小的图片 */
export * from "./canvasToTempFilePath.js";
/** 将像素数据绘制到画布 */
export * from "./canvasPutImageData.js";
/** 获取 canvas 区域隐含的像素数据 */
export * from "./canvasGetImageData.js";
