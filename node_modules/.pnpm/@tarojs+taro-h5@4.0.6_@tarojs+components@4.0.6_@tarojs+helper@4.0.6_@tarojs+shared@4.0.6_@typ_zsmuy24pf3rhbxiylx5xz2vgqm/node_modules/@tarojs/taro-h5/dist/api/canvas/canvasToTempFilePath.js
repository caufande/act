import { findDOM } from '../../utils/index.js';
import { MethodHandler } from '../../utils/handler.js';

/**
 * 把当前画布指定区域的内容导出生成指定大小的图片。在 draw() 回调里调用该方法才能保证图片导出成功。
 * @todo 暂未支持尺寸相关功能
 */
const canvasToTempFilePath = ({ canvasId, fileType, quality, success, fail, complete }, inst) => {
    const handle = new MethodHandler({ name: 'canvasToTempFilePath', success, fail, complete });
    const el = findDOM(inst);
    const canvas = el === null || el === void 0 ? void 0 : el.querySelector(`canvas[canvas-id="${canvasId}"]`);
    try {
        const dataURL = canvas === null || canvas === void 0 ? void 0 : canvas.toDataURL(`image/${(fileType === 'jpg' ? 'jpeg' : fileType) || 'png'}`, quality);
        return handle.success({
            tempFilePath: dataURL
        });
    }
    catch (e) {
        return handle.fail({
            errMsg: e.message
        });
    }
};

export { canvasToTempFilePath };
//# sourceMappingURL=canvasToTempFilePath.js.map
