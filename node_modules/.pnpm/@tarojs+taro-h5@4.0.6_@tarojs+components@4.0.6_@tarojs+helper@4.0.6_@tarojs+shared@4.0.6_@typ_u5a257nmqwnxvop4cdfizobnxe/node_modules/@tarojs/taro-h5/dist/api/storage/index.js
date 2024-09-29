import { getParameterError, shouldBeObject, temporarilyNotSupport } from '../../utils/index.js';
import { MethodHandler } from '../../utils/handler.js';
export { getBackgroundFetchData, getBackgroundFetchToken, onBackgroundFetchData, setBackgroundFetchToken } from './background-fetch.js';
export { createCacheManager } from './cache-manager.js';

function getItem(key) {
    let item;
    try {
        item = JSON.parse(localStorage.getItem(key) || '');
    }
    catch (e) { } // eslint-disable-line no-empty
    // 只返回使用 Taro.setStorage API 存储的数据
    if (item && typeof item === 'object' && item.hasOwnProperty('data')) {
        return { result: true, data: item.data };
    }
    else {
        return { result: false };
    }
}
// 数据缓存
const setStorageSync = (key, data = '') => {
    if (typeof key !== 'string') {
        console.error(getParameterError({
            name: 'setStorage',
            correct: 'String',
            wrong: key
        }));
        return;
    }
    const type = typeof data;
    let obj = {};
    if (type === 'symbol') {
        obj = { data: '' };
    }
    else {
        obj = { data };
    }
    localStorage.setItem(key, JSON.stringify(obj));
};
const setStorage = (options) => {
    // options must be an Object
    const isObject = shouldBeObject(options);
    if (!isObject.flag) {
        const res = { errMsg: `setStorage:fail ${isObject.msg}` };
        console.error(res.errMsg);
        return Promise.reject(res);
    }
    const { key, data, success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'setStorage', success, fail, complete });
    if (typeof key !== 'string') {
        return handle.fail({
            errMsg: getParameterError({
                para: 'key',
                correct: 'String',
                wrong: key
            })
        });
    }
    setStorageSync(key, data);
    return handle.success();
};
const revokeBufferURL = /* @__PURE__ */ temporarilyNotSupport('revokeBufferURL');
const removeStorageSync = (key) => {
    if (typeof key !== 'string') {
        console.error(getParameterError({
            name: 'removeStorage',
            correct: 'String',
            wrong: key
        }));
        return;
    }
    localStorage.removeItem(key);
};
const removeStorage = (options) => {
    // options must be an Object
    const isObject = shouldBeObject(options);
    if (!isObject.flag) {
        const res = { errMsg: `removeStorage:fail ${isObject.msg}` };
        console.error(res.errMsg);
        return Promise.reject(res);
    }
    const { key, success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'removeStorage', success, fail, complete });
    if (typeof key !== 'string') {
        return handle.fail({
            errMsg: getParameterError({
                para: 'key',
                correct: 'String',
                wrong: key
            })
        });
    }
    removeStorageSync(key);
    return handle.success();
};
const getStorageSync = (key) => {
    if (typeof key !== 'string') {
        console.error(getParameterError({
            name: 'getStorageSync',
            correct: 'String',
            wrong: key
        }));
        return;
    }
    const res = getItem(key);
    if (res.result)
        return res.data;
    return '';
};
const getStorageInfoSync = () => {
    const res = {
        keys: Object.keys(localStorage),
        limitSize: NaN,
        currentSize: NaN
    };
    return res;
};
const getStorageInfo = ({ success, fail, complete } = {}) => {
    const handle = new MethodHandler({ name: 'getStorageInfo', success, fail, complete });
    return handle.success(getStorageInfoSync());
};
const getStorage = (options) => {
    // options must be an Object
    const isObject = shouldBeObject(options);
    if (!isObject.flag) {
        const res = { errMsg: `getStorage:fail ${isObject.msg}` };
        console.error(res.errMsg);
        return Promise.reject(res);
    }
    const { key, success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'getStorage', success, fail, complete });
    if (typeof key !== 'string') {
        return handle.fail({
            errMsg: getParameterError({
                para: 'key',
                correct: 'String',
                wrong: key
            })
        });
    }
    const { result, data } = getItem(key);
    if (result) {
        return handle.success({ data });
    }
    else {
        return handle.fail({
            errMsg: 'data not found'
        });
    }
};
const createBufferURL = /* @__PURE__ */ temporarilyNotSupport('createBufferURL');
const clearStorageSync = () => {
    localStorage.clear();
};
const clearStorage = ({ success, fail, complete } = {}) => {
    const handle = new MethodHandler({ name: 'clearStorage', success, fail, complete });
    clearStorageSync();
    return handle.success();
};
const batchSetStorageSync = /* @__PURE__ */ temporarilyNotSupport('batchSetStorageSync');
const batchSetStorage = /* @__PURE__ */ temporarilyNotSupport('batchSetStorage');
const batchGetStorageSync = /* @__PURE__ */ temporarilyNotSupport('batchGetStorageSync');
const batchGetStorage = /* @__PURE__ */ temporarilyNotSupport('batchGetStorage');

export { batchGetStorage, batchGetStorageSync, batchSetStorage, batchSetStorageSync, clearStorage, clearStorageSync, createBufferURL, getStorage, getStorageInfo, getStorageInfoSync, getStorageSync, removeStorage, removeStorageSync, revokeBufferURL, setStorage, setStorageSync };
//# sourceMappingURL=index.js.map
