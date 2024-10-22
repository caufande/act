import { setNavigationBarLoading, setTitle, setNavigationBarStyle } from '@tarojs/router';
import { shouldBeObject, getParameterError, temporarilyNotSupport } from '../../../utils/index.js';
import { MethodHandler } from '../../../utils/handler.js';

// 导航栏
/**
 * 展示导航栏 loading 状态
*/
function showNavigationBarLoading(options = {}) {
    const { success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'showNavigationBarLoading', success, fail, complete });
    setNavigationBarLoading(true);
    return handle.success();
}
function setNavigationBarTitle(options) {
    // options must be an Object
    const isObject = shouldBeObject(options);
    if (!isObject.flag) {
        const res = { errMsg: `setNavigationBarTitle:fail ${isObject.msg}` };
        console.error(res.errMsg);
        return Promise.reject(res);
    }
    const { title, success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'setNavigationBarTitle', success, fail, complete });
    if (!title || typeof title !== 'string') {
        return handle.fail({
            errMsg: getParameterError({
                para: 'title',
                correct: 'String',
                wrong: title
            })
        });
    }
    setTitle(title);
    return handle.success();
}
/**
 * 设置页面导航条颜色
 */
const setNavigationBarColor = (options) => {
    const { backgroundColor, frontColor, success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'setNavigationBarColor', success, fail, complete });
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    meta.setAttribute('content', backgroundColor);
    document.head.appendChild(meta);
    setNavigationBarStyle({ frontColor, backgroundColor });
    return handle.success();
};
/**
 * 隐藏导航栏 loading 状态
*/
function hideNavigationBarLoading(options = {}) {
    const { success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'hideNavigationBarLoading', success, fail, complete });
    setNavigationBarLoading(false);
    return handle.success();
}
const hideHomeButton = /* @__PURE__ */ temporarilyNotSupport('hideHomeButton');

export { hideHomeButton, hideNavigationBarLoading, setNavigationBarColor, setNavigationBarTitle, showNavigationBarLoading };
//# sourceMappingURL=index.js.map
