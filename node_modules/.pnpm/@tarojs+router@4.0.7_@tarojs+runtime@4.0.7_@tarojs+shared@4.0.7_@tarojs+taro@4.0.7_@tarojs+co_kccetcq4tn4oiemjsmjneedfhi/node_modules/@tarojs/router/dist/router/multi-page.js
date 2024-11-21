import { addLeadingSlash, stripBasename, Current, eventCenter } from '@tarojs/runtime';
import queryString from 'query-string';
import { bindPageResize } from '../events/resize.js';
import { bindPageScroll } from '../events/scroll.js';
import { setHistory } from '../history.js';
import { loadRouterStyle } from '../style.js';

/* eslint-disable dot-notation */
class MultiPageHandler {
    constructor(config, history) {
        this.history = history;
        this.config = config;
        this.mount();
    }
    get appId() { return this.config.appId || 'app'; }
    get router() { return this.config.router || {}; }
    get routerMode() { return this.router.mode || 'hash'; }
    get customRoutes() { return this.router.customRoutes || {}; }
    get tabBarList() { var _a; return ((_a = this.config.tabBar) === null || _a === void 0 ? void 0 : _a.list) || []; }
    get PullDownRefresh() { return this.config.PullDownRefresh; }
    set pathname(p) { this.router.pathname = p; }
    get pathname() { return this.router.pathname; }
    get basename() { return this.router.basename || ''; }
    get pageConfig() { return this.config.route; }
    get isTabBar() {
        var _a;
        const routePath = addLeadingSlash(stripBasename(this.pathname, this.basename));
        const pagePath = ((_a = Object.entries(this.customRoutes).find(([, target]) => {
            if (typeof target === 'string') {
                return target === routePath;
            }
            else if ((target === null || target === void 0 ? void 0 : target.length) > 0) {
                return target.includes(routePath);
            }
            return false;
        })) === null || _a === void 0 ? void 0 : _a[0]) || routePath;
        return !!pagePath && this.tabBarList.some(t => t.pagePath === pagePath);
    }
    get search() { return location.search.substr(1); }
    get usingWindowScroll() {
        var _a;
        let usingWindowScroll = true;
        if (typeof ((_a = this.pageConfig) === null || _a === void 0 ? void 0 : _a.usingWindowScroll) === 'boolean') {
            usingWindowScroll = this.pageConfig.usingWindowScroll;
        }
        const win = window;
        win.__taroAppConfig || (win.__taroAppConfig = {});
        win.__taroAppConfig.usingWindowScroll = usingWindowScroll;
        return usingWindowScroll;
    }
    getQuery(search = '', options = {}) {
        search = search ? `${search}&${this.search}` : this.search;
        const query = search
            ? queryString.parse(search)
            : {};
        return Object.assign(Object.assign({}, query), options);
    }
    isDefaultNavigationStyle() {
        var _a, _b;
        let style = (_a = this.config.window) === null || _a === void 0 ? void 0 : _a.navigationStyle;
        if (typeof ((_b = this.pageConfig) === null || _b === void 0 ? void 0 : _b.navigationStyle) === 'string') {
            style = this.pageConfig.navigationStyle;
        }
        return style !== 'custom';
    }
    mount() {
        setHistory(this.history, this.basename);
        // Note: 注入页面样式
        loadRouterStyle(this.tabBarList.length > 1, this.usingWindowScroll);
    }
    onReady(page, onLoad = true) {
        var _a;
        const pageEl = this.getPageContainer(page);
        if (pageEl && !(pageEl === null || pageEl === void 0 ? void 0 : pageEl['__isReady'])) {
            const el = pageEl.firstElementChild;
            const componentOnReady = el === null || el === void 0 ? void 0 : el['componentOnReady'];
            if (componentOnReady) {
                componentOnReady === null || componentOnReady === void 0 ? void 0 : componentOnReady().then(() => {
                    requestAnimationFrame(() => {
                        var _a;
                        (_a = page.onReady) === null || _a === void 0 ? void 0 : _a.call(page);
                        pageEl['__isReady'] = true;
                    });
                });
            }
            else {
                (_a = page.onReady) === null || _a === void 0 ? void 0 : _a.call(page);
                pageEl['__isReady'] = true;
            }
            onLoad && (pageEl['__page'] = page);
        }
    }
    load(page, pageConfig = {}) {
        var _a;
        if (!page)
            return;
        (_a = page.onLoad) === null || _a === void 0 ? void 0 : _a.call(page, this.getQuery('', page.options), () => {
            var _a;
            const pageEl = this.getPageContainer(page);
            if (this.isTabBar) {
                pageEl === null || pageEl === void 0 ? void 0 : pageEl.classList.add('taro_tabbar_page');
            }
            if (this.isDefaultNavigationStyle()) {
                pageEl === null || pageEl === void 0 ? void 0 : pageEl.classList.add('taro_navigation_page');
            }
            this.onReady(page, true);
            (_a = page.onShow) === null || _a === void 0 ? void 0 : _a.call(page);
            this.bindPageEvents(page, pageConfig);
            this.triggerRouterChange();
        });
    }
    getPageContainer(page) {
        var _a;
        const path = page ? page === null || page === void 0 ? void 0 : page.path : (_a = Current.page) === null || _a === void 0 ? void 0 : _a.path;
        const id = path === null || path === void 0 ? void 0 : path.replace(/([^a-z0-9\u00a0-\uffff_-])/ig, '\\$1');
        if (page) {
            return document.querySelector(`.taro_page#${id}`);
        }
        const el = (id
            ? document.querySelector(`.taro_page#${id}`)
            : document.querySelector('.taro_page') ||
                document.querySelector('.taro_router'));
        return el;
    }
    getScrollingElement(page) {
        if (this.usingWindowScroll)
            return window;
        return this.getPageContainer(page) || window;
    }
    bindPageEvents(page, config = {}) {
        var _a;
        const scrollEl = this.getScrollingElement(page);
        const distance = config.onReachBottomDistance || ((_a = this.config.window) === null || _a === void 0 ? void 0 : _a.onReachBottomDistance) || 50;
        bindPageScroll(page, scrollEl, distance);
        bindPageResize(page);
    }
    triggerRouterChange() {
        /**
         * @tarojs/runtime 中生命周期跑在 promise 中，所以这里需要 setTimeout 延迟事件调用
         * TODO 考虑将生命周期返回 Promise，用于处理相关事件调用顺序
         */
        setTimeout(() => {
            eventCenter.trigger('__afterTaroRouterChange', {
                toLocation: {
                    path: this.pathname
                }
            });
        }, 0);
    }
}

export { MultiPageHandler as default };
