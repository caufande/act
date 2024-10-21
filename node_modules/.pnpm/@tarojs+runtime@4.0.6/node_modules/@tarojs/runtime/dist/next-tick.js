import { Current } from './current.js';
import env from './env.js';

const TIMEOUT = 100;
const nextTick = (cb, ctx) => {
    const beginTime = Date.now();
    const router = Current.router;
    const timerFunc = () => {
        setTimeout(function () {
            ctx ? cb.call(ctx) : cb();
        }, 1);
    };
    if (router === null)
        return timerFunc();
    const path = router.$taroPath;
    /**
     * 三种情况
     *   1. 调用 nextTick 时，pendingUpdate 已经从 true 变为 false（即已更新完成），那么需要光等 100ms
     *   2. 调用 nextTick 时，pendingUpdate 为 true，那么刚好可以搭上便车
     *   3. 调用 nextTick 时，pendingUpdate 还是 false，框架仍未启动更新逻辑，这时最多轮询 100ms，等待 pendingUpdate 变为 true。
     */
    function next() {
        var _a, _b, _c;
        const pageElement = env.document.getElementById(path);
        if (pageElement === null || pageElement === void 0 ? void 0 : pageElement.pendingUpdate) {
            if (process.env.TARO_PLATFORM === 'web') {
                // eslint-disable-next-line dot-notation
                (_c = (_b = (_a = pageElement.firstChild) === null || _a === void 0 ? void 0 : _a['componentOnReady']) === null || _b === void 0 ? void 0 : _b.call(_a).then(() => {
                    timerFunc();
                })) !== null && _c !== void 0 ? _c : timerFunc();
            }
            else {
                pageElement.enqueueUpdateCallback(cb, ctx);
            }
        }
        else if (Date.now() - beginTime > TIMEOUT) {
            timerFunc();
        }
        else {
            setTimeout(() => next(), 20);
        }
    }
    next();
};

export { nextTick };
//# sourceMappingURL=next-tick.js.map
