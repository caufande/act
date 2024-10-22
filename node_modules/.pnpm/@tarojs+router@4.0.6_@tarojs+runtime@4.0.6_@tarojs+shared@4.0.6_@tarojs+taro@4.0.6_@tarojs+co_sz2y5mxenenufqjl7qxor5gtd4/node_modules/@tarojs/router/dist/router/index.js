import { addLeadingSlash } from '@tarojs/runtime';

class RouterConfig {
    static set config(e) {
        this.__config = e;
    }
    static get config() {
        return this.__config;
    }
    static get pages() {
        return this.config.pages || [];
    }
    static get router() {
        return this.config.router || {};
    }
    static get mode() {
        return this.router.mode || 'hash';
    }
    static get customRoutes() { return this.router.customRoutes || {}; }
    // 这个方法不考虑 basename 和 customRoutes，只判断原始的 url 是否在 pages 中
    static isPage(url = '') {
        return this.pages.findIndex(e => addLeadingSlash(e) === url) !== -1;
    }
}

export { RouterConfig };
