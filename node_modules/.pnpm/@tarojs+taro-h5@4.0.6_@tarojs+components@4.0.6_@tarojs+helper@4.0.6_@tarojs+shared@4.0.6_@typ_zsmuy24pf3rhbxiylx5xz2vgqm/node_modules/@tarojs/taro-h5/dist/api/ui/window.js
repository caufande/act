import { temporarilyNotSupport } from '../../utils/index.js';
import { CallbackManager } from '../../utils/handler.js';

const callbackManager = new CallbackManager();
const resizeListener = () => {
    callbackManager.trigger({
        windowWidth: window.screen.width,
        windowHeight: window.screen.height
    });
};
/**
 * 设置窗口大小，该接口仅适用于 PC 平台，使用细则请参见指南
 */
const setWindowSize = /* @__PURE__ */ temporarilyNotSupport('setWindowSize');
/**
 * 监听窗口尺寸变化事件
 */
const onWindowResize = callback => {
    callbackManager.add(callback);
    if (callbackManager.count() === 1) {
        window.addEventListener('resize', resizeListener);
    }
};
/**
 * 取消监听窗口尺寸变化事件
 */
const offWindowResize = callback => {
    callbackManager.remove(callback);
    if (callbackManager.count() === 0) {
        window.removeEventListener('resize', resizeListener);
    }
};
const checkIsPictureInPictureActive = /* @__PURE__ */ temporarilyNotSupport('checkIsPictureInPictureActive');

export { checkIsPictureInPictureActive, offWindowResize, onWindowResize, setWindowSize };
//# sourceMappingURL=window.js.map
