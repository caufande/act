import { __classPrivateFieldSet, __classPrivateFieldGet } from 'tslib';
import { Events, isString, isNumber, warn } from '@tarojs/shared';
import { CONTEXT_ACTIONS } from '../constants/index.js';
import { getCurrentInstance } from '../current.js';
import '../emitter/emitter.js';
import env from '../env.js';
import { RuntimeCache } from '../utils/cache.js';
import { TaroURLProvider } from './URL.js';

var _TaroLocation_instances, _TaroLocation_url, _TaroLocation_noCheckUrl, _TaroLocation_window, _TaroLocation_reset, _TaroLocation_getPreValue, _TaroLocation_rollBack, _TaroLocation_recordHistory, _TaroLocation_checkUrlChange;
const INIT_URL = 'https://taro.com';
const cache = new RuntimeCache('location');
class TaroLocation extends Events {
    constructor(options) {
        super();
        _TaroLocation_instances.add(this);
        /* private property */
        _TaroLocation_url.set(this, new TaroURLProvider(INIT_URL));
        _TaroLocation_noCheckUrl.set(this, false);
        _TaroLocation_window.set(this, void 0);
        __classPrivateFieldSet(this, _TaroLocation_window, options.window, "f");
        __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_reset).call(this);
        this.on('__set_href_without_history__', (href) => {
            __classPrivateFieldSet(this, _TaroLocation_noCheckUrl, true, "f");
            const lastHash = __classPrivateFieldGet(this, _TaroLocation_url, "f").hash;
            __classPrivateFieldGet(this, _TaroLocation_url, "f").href = generateFullUrl(href);
            if (lastHash !== __classPrivateFieldGet(this, _TaroLocation_url, "f").hash) {
                __classPrivateFieldGet(this, _TaroLocation_window, "f").trigger('hashchange');
            }
            __classPrivateFieldSet(this, _TaroLocation_noCheckUrl, false, "f");
        }, null);
        // 切换上下文行为
        this.on(CONTEXT_ACTIONS.INIT, () => {
            __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_reset).call(this);
        }, null);
        this.on(CONTEXT_ACTIONS.RESTORE, (pageId) => {
            cache.set(pageId, {
                lastHref: this.href,
            });
        }, null);
        this.on(CONTEXT_ACTIONS.RECOVER, (pageId) => {
            // 数据恢复时，不需要执行跳转
            if (cache.has(pageId)) {
                const ctx = cache.get(pageId);
                __classPrivateFieldSet(this, _TaroLocation_noCheckUrl, true, "f");
                __classPrivateFieldGet(this, _TaroLocation_url, "f").href = ctx.lastHref;
                __classPrivateFieldSet(this, _TaroLocation_noCheckUrl, false, "f");
            }
        }, null);
        this.on(CONTEXT_ACTIONS.DESTORY, (pageId) => {
            cache.delete(pageId);
        }, null);
    }
    /* public property */
    get protocol() {
        return __classPrivateFieldGet(this, _TaroLocation_url, "f").protocol;
    }
    set protocol(val) {
        const REG = /^(http|https):$/i;
        if (!val || !isString(val) || !REG.test(val.trim()))
            return;
        val = val.trim();
        const preValue = __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_getPreValue).call(this);
        __classPrivateFieldGet(this, _TaroLocation_url, "f").protocol = val;
        if (__classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_checkUrlChange).call(this, preValue))
            __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_recordHistory).call(this);
    }
    get host() {
        return __classPrivateFieldGet(this, _TaroLocation_url, "f").host;
    }
    set host(val) {
        if (!val || !isString(val))
            return;
        val = val.trim();
        const preValue = __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_getPreValue).call(this);
        __classPrivateFieldGet(this, _TaroLocation_url, "f").host = val;
        if (__classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_checkUrlChange).call(this, preValue))
            __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_recordHistory).call(this);
    }
    get hostname() {
        return __classPrivateFieldGet(this, _TaroLocation_url, "f").hostname;
    }
    set hostname(val) {
        if (!val || !isString(val))
            return;
        val = val.trim();
        const preValue = __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_getPreValue).call(this);
        __classPrivateFieldGet(this, _TaroLocation_url, "f").hostname = val;
        if (__classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_checkUrlChange).call(this, preValue))
            __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_recordHistory).call(this);
    }
    get port() {
        return __classPrivateFieldGet(this, _TaroLocation_url, "f").port;
    }
    set port(val) {
        const xVal = Number((val = val.trim()));
        if (!isNumber(xVal) || xVal <= 0)
            return;
        const preValue = __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_getPreValue).call(this);
        __classPrivateFieldGet(this, _TaroLocation_url, "f").port = val;
        if (__classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_checkUrlChange).call(this, preValue))
            __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_recordHistory).call(this);
    }
    get pathname() {
        return __classPrivateFieldGet(this, _TaroLocation_url, "f").pathname;
    }
    set pathname(val) {
        if (!val || !isString(val))
            return;
        val = val.trim();
        const preValue = __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_getPreValue).call(this);
        __classPrivateFieldGet(this, _TaroLocation_url, "f").pathname = val;
        if (__classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_checkUrlChange).call(this, preValue))
            __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_recordHistory).call(this);
    }
    get search() {
        return __classPrivateFieldGet(this, _TaroLocation_url, "f").search;
    }
    set search(val) {
        if (!val || !isString(val))
            return;
        val = val.trim();
        val = val.startsWith('?') ? val : `?${val}`;
        const preValue = __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_getPreValue).call(this);
        __classPrivateFieldGet(this, _TaroLocation_url, "f").search = val;
        if (__classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_checkUrlChange).call(this, preValue))
            __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_recordHistory).call(this);
    }
    get hash() {
        return __classPrivateFieldGet(this, _TaroLocation_url, "f").hash;
    }
    // 小程序的navigateTo存在截断hash字符串的问题
    set hash(val) {
        if (!val || !isString(val))
            return;
        val = val.trim();
        val = val.startsWith('#') ? val : `#${val}`;
        const preValue = __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_getPreValue).call(this);
        __classPrivateFieldGet(this, _TaroLocation_url, "f").hash = val;
        if (__classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_checkUrlChange).call(this, preValue))
            __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_recordHistory).call(this);
    }
    get href() {
        return __classPrivateFieldGet(this, _TaroLocation_url, "f").href;
    }
    set href(val) {
        const REG = /^(http:|https:)?\/\/.+/;
        if (!val || !isString(val) || !REG.test((val = val.trim())))
            return;
        const preValue = __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_getPreValue).call(this);
        __classPrivateFieldGet(this, _TaroLocation_url, "f").href = val;
        if (__classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_checkUrlChange).call(this, preValue))
            __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_recordHistory).call(this);
    }
    get origin() {
        return __classPrivateFieldGet(this, _TaroLocation_url, "f").origin;
    }
    set origin(val) {
        const REG = /^(http:|https:)?\/\/.+/;
        if (!val || !isString(val) || !REG.test((val = val.trim())))
            return;
        const preValue = __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_getPreValue).call(this);
        __classPrivateFieldGet(this, _TaroLocation_url, "f").origin = val;
        if (__classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_checkUrlChange).call(this, preValue))
            __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_recordHistory).call(this);
    }
    /* public method */
    assign() {
        warn(true, '小程序环境中调用location.assign()无效.');
    }
    reload() {
        warn(true, '小程序环境中调用location.reload()无效.');
    }
    replace(url) {
        this.trigger('__set_href_without_history__', url);
    }
    toString() {
        return this.href;
    }
    // For debug
    get cache() {
        return cache;
    }
}
_TaroLocation_url = new WeakMap(), _TaroLocation_noCheckUrl = new WeakMap(), _TaroLocation_window = new WeakMap(), _TaroLocation_instances = new WeakSet(), _TaroLocation_reset = function _TaroLocation_reset() {
    const Current = getCurrentInstance();
    const router = Current.router;
    if (router) {
        const { path, params } = router;
        const searchArr = Object.keys(params).map((key) => {
            return `${key}=${params[key]}`;
        });
        const searchStr = searchArr.length > 0 ? '?' + searchArr.join('&') : '';
        const url = `${INIT_URL}${path.startsWith('/') ? path : '/' + path}${searchStr}`;
        __classPrivateFieldSet(this, _TaroLocation_url, new TaroURLProvider(url), "f");
        this.trigger('__reset_history__', this.href);
    }
}, _TaroLocation_getPreValue = function _TaroLocation_getPreValue() {
    return __classPrivateFieldGet(this, _TaroLocation_url, "f")._toRaw();
}, _TaroLocation_rollBack = function _TaroLocation_rollBack(href) {
    __classPrivateFieldGet(this, _TaroLocation_url, "f").href = href;
}, _TaroLocation_recordHistory = function _TaroLocation_recordHistory() {
    this.trigger('__record_history__', this.href);
}, _TaroLocation_checkUrlChange = function _TaroLocation_checkUrlChange(preValue) {
    if (__classPrivateFieldGet(this, _TaroLocation_noCheckUrl, "f")) {
        return false;
    }
    const { protocol, hostname, port, pathname, search, hash } = __classPrivateFieldGet(this, _TaroLocation_url, "f")._toRaw();
    // 跨域三要素不允许修改
    if (protocol !== preValue.protocol || hostname !== preValue.hostname || port !== preValue.port) {
        __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_rollBack).call(this, preValue.href);
        return false;
    }
    // pathname
    if (pathname !== preValue.pathname) {
        return true;
    }
    // search
    if (search !== preValue.search) {
        return true;
    }
    // hashchange
    if (hash !== preValue.hash) {
        __classPrivateFieldGet(this, _TaroLocation_window, "f").trigger('hashchange');
        return true;
    }
    __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_rollBack).call(this, preValue.href);
    return false;
};
const Location = process.env.TARO_PLATFORM === 'web' ? env.window.Location : TaroLocation;
function generateFullUrl(val = '') {
    const origin = INIT_URL;
    if (/^[/?#]/.test(val)) {
        return origin + val;
    }
    return val;
}

export { Location };
//# sourceMappingURL=location.js.map
