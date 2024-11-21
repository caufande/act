import { __rest } from 'tslib';
import 'whatwg-fetch';
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
import Taro from '@tarojs/api';
import { isFunction } from '@tarojs/shared';
import jsonpRetry from 'jsonp-retry';
import { serializeParams } from '../../../utils/index.js';
import { NETWORK_TIMEOUT } from '../utils.js';

// @ts-ignore
const { Link } = Taro;
function generateRequestUrlWithParams(url = '', params) {
    params = typeof params === 'string' ? params : serializeParams(params);
    if (params) {
        url += (~url.indexOf('?') ? '&' : '?') + params;
    }
    url = url.replace('?&', '?');
    return url;
}
function _request(options = {}) {
    const { success, complete, fail } = options;
    const params = {};
    const res = {};
    let { cache = 'default', credentials, data, dataType, header = {}, jsonp, method = 'GET', mode, responseType, signal, timeout, url = '' } = options, opts = __rest(options, ["cache", "credentials", "data", "dataType", "header", "jsonp", "method", "mode", "responseType", "signal", "timeout", "url"]);
    if (typeof timeout !== 'number') {
        timeout = NETWORK_TIMEOUT;
    }
    Object.assign(params, opts);
    if (jsonp) {
        // @ts-ignore
        params.params = data;
        params.cache = opts.jsonpCache;
        // @ts-ignore
        params.timeout = timeout;
        if (typeof jsonp === 'string') {
            // @ts-ignore
            params.name = jsonp;
        }
        // Note: https://github.com/luckyadam/jsonp-retry
        return jsonpRetry(url, params)
            .then(data => {
            res.statusCode = 200;
            res.data = data;
            isFunction(success) && success(res);
            isFunction(complete) && complete(res);
            return res;
        })
            .catch(err => {
            isFunction(fail) && fail(err);
            isFunction(complete) && complete(res);
            return Promise.reject(err);
        });
    }
    params.method = method;
    const methodUpper = params.method.toUpperCase();
    params.cache = cache;
    if (methodUpper === 'GET' || methodUpper === 'HEAD') {
        url = generateRequestUrlWithParams(url, data);
    }
    else if (['[object Array]', '[object Object]'].indexOf(Object.prototype.toString.call(data)) >= 0) {
        const keyOfContentType = Object.keys(header).find(item => item.toLowerCase() === 'content-type');
        if (!keyOfContentType) {
            header['Content-Type'] = 'application/json';
        }
        const contentType = header[keyOfContentType || 'Content-Type'];
        if (contentType.indexOf('application/json') >= 0) {
            params.body = JSON.stringify(data);
        }
        else if (contentType.indexOf('application/x-www-form-urlencoded') >= 0) {
            params.body = serializeParams(data);
        }
        else {
            params.body = data;
        }
    }
    else {
        params.body = data;
    }
    if (header) {
        params.headers = header;
    }
    if (mode) {
        params.mode = mode;
    }
    let timeoutTimer = null;
    let controller = null;
    if (signal) {
        params.signal = signal;
    }
    else {
        controller = new window.AbortController();
        params.signal = controller.signal;
        timeoutTimer = setTimeout(function () {
            if (controller)
                controller.abort();
        }, timeout);
    }
    params.credentials = credentials;
    const p = fetch(url, params)
        .then(response => {
        if (timeoutTimer) {
            clearTimeout(timeoutTimer);
            timeoutTimer = null;
        }
        if (controller) {
            controller = null;
        }
        if (!response) {
            const errorResponse = { ok: false };
            throw errorResponse;
        }
        res.statusCode = response.status;
        res.header = {};
        for (const key of response.headers.keys()) {
            res.header[key] = response.headers.get(key);
        }
        if (responseType === 'arraybuffer') {
            return response.arrayBuffer();
        }
        if (res.statusCode !== 204) {
            if (dataType === 'json' || typeof dataType === 'undefined') {
                return response.json().catch(() => {
                    return null;
                });
            }
        }
        if (responseType === 'text' || dataType === 'text') {
            return response.text();
        }
        return Promise.resolve(null);
    })
        .then(data => {
        res.data = data;
        isFunction(success) && success(res);
        isFunction(complete) && complete(res);
        return res;
    })
        .catch(err => {
        if (timeoutTimer) {
            clearTimeout(timeoutTimer);
            timeoutTimer = null;
        }
        if (controller) {
            controller = null;
        }
        isFunction(fail) && fail(err);
        isFunction(complete) && complete(res);
        err.statusCode = res.statusCode;
        err.errMsg = err.message;
        return Promise.reject(err);
    });
    if (!p.abort && controller) {
        p.abort = cb => {
            if (controller) {
                cb && cb();
                controller.abort();
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                    timeoutTimer = null;
                }
            }
        };
    }
    return p;
}
function taroInterceptor(chain) {
    return _request(chain.requestParams);
}
const link = new Link(taroInterceptor);
const request = ((...args) => {
    const [url = '', options = {}] = args;
    if (typeof url === 'string') {
        options.url = url;
    }
    else {
        Object.assign(options, url);
    }
    return link.request(options);
});
const addInterceptor = link.addInterceptor.bind(link);
const cleanInterceptors = link.cleanInterceptors.bind(link);

export { addInterceptor, cleanInterceptors, request };
//# sourceMappingURL=index.js.map
