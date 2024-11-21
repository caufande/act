import Taro from '@tarojs/api';
import { hooks, Current, getCurrentPage, getHomePage } from '@tarojs/runtime';
import { isFunction } from '@tarojs/shared';
import { MethodHandler } from './handler.js';
export { easeInOut, getTimingFunc } from './animation.js';
export { createDownload } from './helper.js';
export { isValidColor } from './valid.js';

/* eslint-disable prefer-promise-reject-errors */
function shouldBeObject(target) {
    if (target && typeof target === 'object')
        return { flag: true };
    return {
        flag: false,
        msg: getParameterError({
            correct: 'Object',
            wrong: target
        })
    };
}
function findDOM(inst) {
    if (inst && hooks.isExist('getDOMNode')) {
        return hooks.call('getDOMNode', inst);
    }
    const page = Current.page;
    const path = page === null || page === void 0 ? void 0 : page.path;
    const msg = '没有找到已经加载了的页面，请在页面加载完成后使用此 API。';
    if (path == null) {
        throw new Error(msg);
    }
    const el = document.getElementById(path);
    if (el == null) {
        throw new Error('在已加载页面中没有找到对应的容器元素。');
    }
    return el;
}
function getParameterError({ name = '', para, correct, wrong, level = 'error' }) {
    const parameter = para ? `parameter.${para}` : 'parameter';
    const errorType = upperCaseFirstLetter(wrong === null ? 'Null' : typeof wrong);
    return `${name ? `${name}:fail ` : ''}parameter ${level}: ${parameter} should be ${correct} instead of ${errorType}`;
}
function upperCaseFirstLetter(string) {
    if (typeof string !== 'string')
        return string;
    string = string.replace(/^./, match => match.toUpperCase());
    return string;
}
function inlineStyle(style) {
    let res = '';
    for (const attr in style)
        res += `${attr}: ${style[attr]};`;
    if (res.indexOf('display: flex;') >= 0)
        res += 'display: -webkit-box;display: -webkit-flex;';
    res = res.replace(/transform:(.+?);/g, (s, $1) => `${s}-webkit-transform:${$1};`);
    res = res.replace(/flex-direction:(.+?);/g, (s, $1) => `${s}-webkit-flex-direction:${$1};`);
    return res;
}
function setTransform(el, val) {
    el.style.webkitTransform = val;
    el.style.transform = val;
}
function serializeParams(params) {
    if (!params) {
        return '';
    }
    return Object.keys(params)
        .map(key => (`${encodeURIComponent(key)}=${typeof (params[key]) === 'object'
        ? encodeURIComponent(JSON.stringify(params[key]))
        : encodeURIComponent(params[key])}`))
        .join('&');
}
function temporarilyNotSupport(name = '') {
    return (option = {}, ...args) => {
        const { success, fail, complete } = option;
        const handle = new MethodHandler({ name, success, fail, complete });
        const errMsg = '暂时不支持 API';
        Taro.eventCenter.trigger('__taroNotSupport', {
            name,
            args: [option, ...args],
            type: 'method',
            category: 'temporarily',
        });
        if (process.env.NODE_ENV === 'production') {
            console.warn(errMsg);
            return handle.success({ errMsg });
        }
        else {
            return handle.fail({ errMsg });
        }
    };
}
function weixinCorpSupport(name) {
    return (option = {}, ...args) => {
        const { success, fail, complete } = option;
        const handle = new MethodHandler({ name, success, fail, complete });
        const errMsg = 'h5 端当前仅在微信公众号 JS-SDK 环境下支持此 API';
        Taro.eventCenter.trigger('__taroNotSupport', {
            name,
            args: [option, ...args],
            type: 'method',
            category: 'weixin_corp',
        });
        if (process.env.NODE_ENV === 'production') {
            console.warn(errMsg);
            return handle.success({ errMsg });
        }
        else {
            return handle.fail({ errMsg });
        }
    };
}
function permanentlyNotSupport(name = '') {
    return (option = {}, ...args) => {
        const { success, fail, complete } = option;
        const handle = new MethodHandler({ name, success, fail, complete });
        const errMsg = '不支持 API';
        Taro.eventCenter.trigger('__taroNotSupport', {
            name,
            args: [option, ...args],
            type: 'method',
            category: 'permanently',
        });
        if (process.env.NODE_ENV === 'production') {
            console.warn(errMsg);
            return handle.success({ errMsg });
        }
        else {
            return handle.fail({ errMsg });
        }
    };
}
function processOpenApi({ name, defaultOptions, standardMethod, formatOptions = options => options, formatResult = res => res }) {
    const notSupported = weixinCorpSupport(name);
    return (options = {}, ...args) => {
        var _a;
        // @ts-ignore
        const targetApi = (_a = window === null || window === void 0 ? void 0 : window.wx) === null || _a === void 0 ? void 0 : _a[name];
        const opts = formatOptions(Object.assign({}, defaultOptions, options));
        if (isFunction(targetApi)) {
            return new Promise((resolve, reject) => {
                ['fail', 'success', 'complete'].forEach(k => {
                    opts[k] = preRef => {
                        const res = formatResult(preRef);
                        options[k] && options[k](res);
                        if (k === 'success') {
                            resolve(res);
                        }
                        else if (k === 'fail') {
                            reject(res);
                        }
                    };
                    return targetApi(opts);
                });
            });
        }
        else if (isFunction(standardMethod)) {
            return standardMethod(opts);
        }
        else {
            return notSupported(options, ...args);
        }
    };
}
/**
 * 获取当前页面路径
 * @returns
 */
function getCurrentPath() {
    var _a, _b, _c, _d, _e, _f;
    const appConfig = window.__taroAppConfig || {};
    const routePath = getCurrentPage((_a = appConfig.router) === null || _a === void 0 ? void 0 : _a.mode, (_b = appConfig.router) === null || _b === void 0 ? void 0 : _b.basename);
    const homePath = getHomePage((_d = (_c = appConfig.routes) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.path, (_e = appConfig.router) === null || _e === void 0 ? void 0 : _e.basename, (_f = appConfig.router) === null || _f === void 0 ? void 0 : _f.customRoutes, appConfig.entryPagePath);
    /**
     * createPageConfig 时根据 stack 的长度来设置 stamp 以保证页面 path 的唯一，此函数是在 createPageConfig 之前调用，预先设置 stamp=1
     * url 上没有指定应用的启动页面时使用 homePath
     */
    return `${routePath === '/' ? homePath : routePath}?stamp=1`;
}

export { findDOM, getCurrentPath, getParameterError, inlineStyle, permanentlyNotSupport, processOpenApi, serializeParams, setTransform, shouldBeObject, temporarilyNotSupport, upperCaseFirstLetter, weixinCorpSupport };
//# sourceMappingURL=index.js.map
