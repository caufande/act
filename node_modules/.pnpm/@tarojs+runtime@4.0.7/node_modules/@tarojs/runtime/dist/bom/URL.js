import { __classPrivateFieldSet, __classPrivateFieldGet } from 'tslib';
import { isString, isUndefined } from '@tarojs/shared';
import env from '../env.js';
import { URLSearchParams } from './URLSearchParams.js';

var _TaroURL_hash, _TaroURL_hostname, _TaroURL_pathname, _TaroURL_port, _TaroURL_protocol, _TaroURL_search;
class TaroURL {
    static createObjectURL() {
        throw new Error('Oops, not support URL.createObjectURL() in miniprogram.');
    }
    static revokeObjectURL() {
        throw new Error('Oops, not support URL.revokeObjectURL() in miniprogram.');
    }
    constructor(url, base) {
        /* private property */
        _TaroURL_hash.set(this, '');
        _TaroURL_hostname.set(this, '');
        _TaroURL_pathname.set(this, '');
        _TaroURL_port.set(this, '');
        _TaroURL_protocol.set(this, '');
        _TaroURL_search.set(this, void 0);
        if (!isString(url))
            url = String(url);
        const parseResult = parseUrlBase(url, base);
        const { hash, hostname, pathname, port, protocol, search } = parseResult;
        __classPrivateFieldSet(this, _TaroURL_hash, hash, "f");
        __classPrivateFieldSet(this, _TaroURL_hostname, hostname, "f");
        __classPrivateFieldSet(this, _TaroURL_pathname, pathname || '/', "f");
        __classPrivateFieldSet(this, _TaroURL_port, port, "f");
        __classPrivateFieldSet(this, _TaroURL_protocol, protocol, "f");
        __classPrivateFieldSet(this, _TaroURL_search, new URLSearchParams(search), "f");
    }
    /* public property */
    get protocol() {
        return __classPrivateFieldGet(this, _TaroURL_protocol, "f");
    }
    set protocol(val) {
        isString(val) && (__classPrivateFieldSet(this, _TaroURL_protocol, val.trim(), "f"));
    }
    get host() {
        return this.hostname + (this.port ? ':' + this.port : '');
    }
    set host(val) {
        if (val && isString(val)) {
            val = val.trim();
            const { hostname, port } = parseUrl(`//${val}`);
            this.hostname = hostname;
            this.port = port;
        }
    }
    get hostname() {
        return __classPrivateFieldGet(this, _TaroURL_hostname, "f");
    }
    set hostname(val) {
        val && isString(val) && (__classPrivateFieldSet(this, _TaroURL_hostname, val.trim(), "f"));
    }
    get port() {
        return __classPrivateFieldGet(this, _TaroURL_port, "f");
    }
    set port(val) {
        isString(val) && (__classPrivateFieldSet(this, _TaroURL_port, val.trim(), "f"));
    }
    get pathname() {
        return __classPrivateFieldGet(this, _TaroURL_pathname, "f");
    }
    set pathname(val) {
        if (isString(val)) {
            val = val.trim();
            const HEAD_REG = /^(\/|\.\/|\.\.\/)/;
            let temp = val;
            while (HEAD_REG.test(temp)) {
                temp = temp.replace(HEAD_REG, '');
            }
            if (temp)
                __classPrivateFieldSet(this, _TaroURL_pathname, '/' + temp, "f");
            else
                __classPrivateFieldSet(this, _TaroURL_pathname, '/', "f");
        }
    }
    get search() {
        const val = __classPrivateFieldGet(this, _TaroURL_search, "f").toString();
        return (val.length === 0 || val.startsWith('?')) ? val : `?${val}`;
    }
    set search(val) {
        if (isString(val)) {
            val = val.trim();
            __classPrivateFieldSet(this, _TaroURL_search, new URLSearchParams(val), "f");
        }
    }
    get hash() {
        return __classPrivateFieldGet(this, _TaroURL_hash, "f");
    }
    set hash(val) {
        if (isString(val)) {
            val = val.trim();
            if (val)
                __classPrivateFieldSet(this, _TaroURL_hash, val.startsWith('#') ? val : `#${val}`, "f");
            else
                __classPrivateFieldSet(this, _TaroURL_hash, '', "f");
        }
    }
    get href() {
        return `${this.protocol}//${this.host}${this.pathname}${this.search}${this.hash}`;
    }
    set href(val) {
        if (val && isString(val)) {
            val = val.trim();
            const { protocol, hostname, port, hash, search, pathname } = parseUrl(val);
            this.protocol = protocol;
            this.hostname = hostname;
            this.pathname = pathname;
            this.port = port;
            this.hash = hash;
            this.search = search;
        }
    }
    get origin() {
        return `${this.protocol}//${this.host}`;
    }
    set origin(val) {
        if (val && isString(val)) {
            val = val.trim();
            const { protocol, hostname, port } = parseUrl(val);
            this.protocol = protocol;
            this.hostname = hostname;
            this.port = port;
        }
    }
    get searchParams() {
        return __classPrivateFieldGet(this, _TaroURL_search, "f");
    }
    // public method
    toString() {
        return this.href;
    }
    toJSON() {
        return this.toString();
    }
    // convenient for deconstructor
    _toRaw() {
        return {
            protocol: this.protocol,
            port: this.port,
            host: this.host,
            hostname: this.hostname,
            pathname: this.pathname,
            hash: this.hash,
            search: this.search,
            origin: this.origin,
            href: this.href,
        };
    }
}
_TaroURL_hash = new WeakMap(), _TaroURL_hostname = new WeakMap(), _TaroURL_pathname = new WeakMap(), _TaroURL_port = new WeakMap(), _TaroURL_protocol = new WeakMap(), _TaroURL_search = new WeakMap();
// Note: 小程序端 vite 打包成 commonjs，const URL = xxx 会报错，所以把 URL 改为 TaroURLProvider
const TaroURLProvider = process.env.TARO_PLATFORM === 'web' ? env.window.URL : TaroURL;
function parseUrl(url = '') {
    const result = {
        href: '',
        origin: '',
        protocol: '',
        hostname: '',
        host: '',
        port: '',
        pathname: '',
        search: '',
        hash: ''
    };
    if (!url || !isString(url))
        return result;
    url = url.trim();
    const PATTERN = /^(([^:/?#]+):)?\/\/(([^/?#]+):(.+)@)?([^/?#:]*)(:(\d+))?([^?#]*)(\?([^#]*))?(#(.*))?/;
    const matches = url.match(PATTERN);
    if (!matches)
        return result;
    // TODO: username & password ?
    result.protocol = matches[1] || 'https:';
    result.hostname = matches[6] || 'taro.com';
    result.port = matches[8] || '';
    result.pathname = matches[9] || '/';
    result.search = matches[10] || '';
    result.hash = matches[12] || '';
    result.href = url;
    result.origin = result.protocol + '//' + result.hostname;
    result.host = result.hostname + (result.port ? `:${result.port}` : '');
    return result;
}
function parseUrlBase(url, base) {
    const VALID_URL = /^(https?:)\/\//i;
    let fullUrl = '';
    let parsedBase = null;
    if (!isUndefined(base)) {
        base = String(base).trim();
        if (!VALID_URL.test(base))
            throw new TypeError(`Failed to construct 'URL': Invalid base URL`);
        parsedBase = parseUrl(base);
    }
    url = String(url).trim();
    if (VALID_URL.test(url)) {
        fullUrl = url;
    }
    else if (parsedBase) {
        if (url) {
            if (url.startsWith('//')) {
                fullUrl = parsedBase.protocol + url;
            }
            else {
                fullUrl = parsedBase.origin + (url.startsWith('/') ? url : `/${url}`);
            }
        }
        else {
            fullUrl = parsedBase.href;
        }
    }
    else {
        throw new TypeError(`Failed to construct 'URL': Invalid URL`);
    }
    return parseUrl(fullUrl);
}

export { TaroURLProvider, parseUrl };
//# sourceMappingURL=URL.js.map
