import { Current } from '@tarojs/runtime';
import '../../../utils/index.js';
import { MethodHandler } from '../../../utils/handler.js';
import { getTimingFunc, easeInOut } from '../../../utils/animation.js';

let timer;
const FRAME_DURATION = 17;
/**
 * 将页面滚动到目标位置
 */
const pageScrollTo = ({ scrollTop, selector = '', offsetTop = 0, duration = 300, success, fail, complete }) => {
    let scrollFunc;
    const handle = new MethodHandler({ name: 'pageScrollTo', success, fail, complete });
    return new Promise((resolve, reject) => {
        var _a, _b, _c;
        try {
            if (scrollTop === undefined && !selector) {
                return handle.fail({
                    errMsg: 'scrollTop" 或 "selector" 需要其之一'
                }, { resolve, reject });
            }
            const usingWindowScroll = (_a = window.__taroAppConfig) === null || _a === void 0 ? void 0 : _a.usingWindowScroll;
            const id = (_c = (_b = Current.page) === null || _b === void 0 ? void 0 : _b.path) === null || _c === void 0 ? void 0 : _c.replace(/([^a-z0-9\u00a0-\uffff_-])/ig, '\\$1');
            const el = (id
                ? document.querySelector(`.taro_page#${id}`)
                : document.querySelector('.taro_page') ||
                    document.querySelector('.taro_router'));
            if (!scrollFunc) {
                if (usingWindowScroll) {
                    scrollFunc = pos => {
                        if (pos === undefined) {
                            return window.pageYOffset;
                        }
                        else {
                            window.scrollTo(0, pos);
                        }
                    };
                }
                else {
                    scrollFunc = pos => {
                        if (pos === undefined) {
                            return el.scrollTop;
                        }
                        else {
                            el.scrollTop = pos;
                        }
                    };
                }
            }
            if (scrollTop && selector) {
                console.warn('"scrollTop" 或 "selector" 建议只设一个值，全部设置会忽略selector');
            }
            const from = scrollFunc();
            let to;
            if (selector) {
                const el = document.querySelector(selector);
                to = ((el === null || el === void 0 ? void 0 : el.offsetTop) || 0) + offsetTop;
            }
            else {
                to = typeof scrollTop === 'number' ? scrollTop : 0;
            }
            const delta = to - from;
            const frameCnt = duration / FRAME_DURATION;
            const easeFunc = getTimingFunc(easeInOut, frameCnt);
            const scroll = (frame = 0) => {
                const dest = from + delta * easeFunc(frame);
                scrollFunc(dest);
                if (frame < frameCnt) {
                    timer && clearTimeout(timer);
                    timer = setTimeout(() => {
                        scroll(frame + 1);
                    }, FRAME_DURATION);
                }
                else {
                    return handle.success({}, { resolve, reject });
                }
            };
            scroll();
        }
        catch (e) {
            return handle.fail({
                errMsg: e.message
            }, { resolve, reject });
        }
    });
};

export { pageScrollTo };
//# sourceMappingURL=index.js.map
