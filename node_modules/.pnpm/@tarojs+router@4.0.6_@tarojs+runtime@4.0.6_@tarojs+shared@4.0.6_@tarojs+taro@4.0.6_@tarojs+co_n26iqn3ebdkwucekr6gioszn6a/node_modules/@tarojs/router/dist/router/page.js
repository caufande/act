import { getHomePage, getCurrentPage, addLeadingSlash, stripBasename, stripTrailing, requestAnimationFrame, eventCenter, Current } from '@tarojs/runtime';
import queryString from 'query-string';
import { bindPageResize } from '../events/resize.js';
import { bindPageScroll } from '../events/scroll.js';
import { setHistory, history } from '../history.js';
import { loadAnimateStyle, loadRouterStyle } from '../style.js';
import { routesAlias } from '../utils/index.js';
import NavigationBarHandler from './navigation-bar.js';
import stacks from './stack.js';

/* eslint-disable dot-notation */
class PageHandler {
    constructor(config, history) {
        this.history = history;
        this.defaultAnimation = { duration: 300, delay: 50 };
        this.config = config;
        this.homePage = getHomePage(this.routes[0].path, this.basename, this.customRoutes, this.config.entryPagePath);
        this.originHomePage = this.config.entryPagePath || this.routes[0].path || this.basename;
        this.mount();
        this.navigationBarHandler = new NavigationBarHandler(this);
    }
    get currentPage() {
        const routePath = getCurrentPage(this.routerMode, this.basename);
        return routePath === '/' ? this.homePage : routePath;
    }
    get appId() { return this.config.appId || 'app'; }
    get router() { return this.config.router || {}; }
    get routerMode() { return this.router.mode || 'hash'; }
    get customRoutes() { return this.router.customRoutes || {}; }
    get routes() { return this.config.routes || []; }
    get tabBarList() { var _a; return ((_a = this.config.tabBar) === null || _a === void 0 ? void 0 : _a.list) || []; }
    get PullDownRefresh() { return this.config.PullDownRefresh; }
    get animation() { var _a, _b; return (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.animation) !== null && _b !== void 0 ? _b : this.defaultAnimation; }
    get animationDelay() {
        var _a;
        return (typeof this.animation === 'object'
            ? this.animation.delay
            : this.animation
                ? (_a = this.defaultAnimation) === null || _a === void 0 ? void 0 : _a.delay
                : 0) || 0;
    }
    get animationDuration() {
        var _a;
        return (typeof this.animation === 'object'
            ? this.animation.duration
            : this.animation
                ? (_a = this.defaultAnimation) === null || _a === void 0 ? void 0 : _a.duration
                : 0) || 0;
    }
    set pathname(p) { this.router.pathname = p; }
    get pathname() { return this.router.pathname; }
    // Note: 把 pathname 转换为原始路径，主要是处理 customRoutes 和 basename
    get originPathname() { return routesAlias.getOrigin(addLeadingSlash(stripBasename(this.pathname, this.basename))); }
    get basename() { return this.router.basename || ''; }
    get pageConfig() {
        const homePage = addLeadingSlash(this.homePage);
        return this.routes.find(r => {
            const pagePath = addLeadingSlash(r.path);
            return [pagePath, homePage].includes(this.originPathname);
        });
    }
    isTabBar(pathname) {
        var _a;
        const routePath = addLeadingSlash(stripBasename(pathname, this.basename)).split('?')[0];
        const pagePath = ((_a = Object.entries(this.customRoutes).find(([, target]) => {
            if (typeof target === 'string') {
                return target === routePath;
            }
            else if ((target === null || target === void 0 ? void 0 : target.length) > 0) {
                return target.includes(routePath);
            }
            return false;
        })) === null || _a === void 0 ? void 0 : _a[0]) || routePath;
        return !!pagePath && this.tabBarList.some(t => stripTrailing(t.pagePath) === pagePath);
    }
    isDefaultNavigationStyle() {
        var _a, _b;
        let style = (_a = this.config.window) === null || _a === void 0 ? void 0 : _a.navigationStyle;
        if (typeof ((_b = this.pageConfig) === null || _b === void 0 ? void 0 : _b.navigationStyle) === 'string') {
            style = this.pageConfig.navigationStyle;
        }
        return style !== 'custom';
    }
    isSamePage(page) {
        const routePath = stripBasename(this.pathname, this.basename);
        const pagePath = stripBasename(page === null || page === void 0 ? void 0 : page.path, this.basename);
        return pagePath.startsWith(routePath + '?');
    }
    get search() {
        let search = '?';
        if (this.routerMode === 'hash') {
            const idx = location.hash.indexOf('?');
            if (idx > -1) {
                search = location.hash.slice(idx);
            }
        }
        else {
            search = location.search;
        }
        return search.substring(1);
    }
    get usingWindowScroll() {
        var _a;
        let usingWindowScroll = false;
        if (typeof ((_a = this.pageConfig) === null || _a === void 0 ? void 0 : _a.usingWindowScroll) === 'boolean') {
            usingWindowScroll = this.pageConfig.usingWindowScroll;
        }
        const win = window;
        win.__taroAppConfig || (win.__taroAppConfig = {});
        win.__taroAppConfig.usingWindowScroll = usingWindowScroll;
        return usingWindowScroll;
    }
    getQuery(stamp = '', search = '', options = {}) {
        search = search ? `${search}&${this.search}` : this.search;
        const query = search
            ? queryString.parse(search, { decode: false })
            : {};
        query.stamp = stamp;
        return Object.assign(Object.assign({}, query), options);
    }
    mount() {
        setHistory(this.history, this.basename);
        this.pathname = history.location.pathname;
        // Note: 注入页面样式
        this.animation && loadAnimateStyle(this.animationDuration);
        loadRouterStyle(this.tabBarList.length > 1, this.usingWindowScroll, this.router.enhanceAnimation);
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
    load(page, pageConfig = {}, stampId, pageNo = 0) {
        var _a, _b;
        if (!page)
            return;
        // NOTE: 页面栈推入太晚可能导致 getCurrentPages 无法获取到当前页面实例
        stacks.push(page);
        const param = this.getQuery(stampId, '', page.options);
        let pageEl = this.getPageContainer(page);
        if (pageEl) {
            pageEl.classList.remove('taro_page_shade');
            this.isTabBar(this.pathname) && pageEl.classList.add('taro_tabbar_page');
            this.isDefaultNavigationStyle() && pageEl.classList.add('taro_navigation_page');
            this.addAnimation(pageEl, pageNo === 0);
            (_a = page.onShow) === null || _a === void 0 ? void 0 : _a.call(page);
            this.navigationBarHandler.load();
            this.bindPageEvents(page, pageConfig);
            this.triggerRouterChange();
        }
        else {
            // FIXME 在 iOS 端快速切换页面时，可能不会执行回调注入对应类名导致 TabBar 白屏
            (_b = page.onLoad) === null || _b === void 0 ? void 0 : _b.call(page, param, () => {
                var _a;
                pageEl = this.getPageContainer(page);
                this.isTabBar(this.pathname) && (pageEl === null || pageEl === void 0 ? void 0 : pageEl.classList.add('taro_tabbar_page'));
                this.isDefaultNavigationStyle() && (pageEl === null || pageEl === void 0 ? void 0 : pageEl.classList.add('taro_navigation_page'));
                this.addAnimation(pageEl, pageNo === 0);
                (_a = page.onShow) === null || _a === void 0 ? void 0 : _a.call(page);
                this.navigationBarHandler.load();
                this.onReady(page, true);
                this.bindPageEvents(page, pageConfig);
                this.triggerRouterChange();
            });
        }
    }
    unload(page, delta = 1, top = false) {
        var _a, _b, _c;
        if (!page)
            return;
        stacks.delta = --delta;
        stacks.pop();
        if (this.animation && top) {
            if (this.unloadTimer) {
                clearTimeout(this.unloadTimer);
                (_b = (_a = this.lastUnloadPage) === null || _a === void 0 ? void 0 : _a.onUnload) === null || _b === void 0 ? void 0 : _b.call(_a);
                this.unloadTimer = null;
            }
            this.lastUnloadPage = page;
            const pageEl = this.getPageContainer(page);
            pageEl === null || pageEl === void 0 ? void 0 : pageEl.classList.remove('taro_page_stationed');
            pageEl === null || pageEl === void 0 ? void 0 : pageEl.classList.remove('taro_page_show');
            if (pageEl) {
                pageEl.style.zIndex = '1';
            }
            this.unloadTimer = setTimeout(() => {
                var _a, _b;
                this.unloadTimer = null;
                (_b = (_a = this.lastUnloadPage) === null || _a === void 0 ? void 0 : _a.onUnload) === null || _b === void 0 ? void 0 : _b.call(_a);
                eventCenter.trigger('__taroPageOnShowAfterDestroyed');
            }, this.animationDuration);
        }
        else {
            const pageEl = this.getPageContainer(page);
            pageEl === null || pageEl === void 0 ? void 0 : pageEl.classList.remove('taro_page_stationed');
            pageEl === null || pageEl === void 0 ? void 0 : pageEl.classList.remove('taro_page_show');
            (_c = page === null || page === void 0 ? void 0 : page.onUnload) === null || _c === void 0 ? void 0 : _c.call(page);
            setTimeout(() => {
                eventCenter.trigger('__taroPageOnShowAfterDestroyed');
            }, 0);
        }
        if (delta >= 1)
            this.unload(stacks.last, delta);
    }
    show(page, pageConfig = {}, pageNo = 0) {
        var _a, _b;
        if (!page)
            return;
        const param = this.getQuery(page['$taroParams']['stamp'], '', page.options);
        let pageEl = this.getPageContainer(page);
        if (pageEl) {
            pageEl.classList.remove('taro_page_shade');
            this.addAnimation(pageEl, pageNo === 0);
            (_a = page.onShow) === null || _a === void 0 ? void 0 : _a.call(page);
            this.navigationBarHandler.load();
            this.bindPageEvents(page, pageConfig);
            this.triggerRouterChange();
        }
        else {
            (_b = page.onLoad) === null || _b === void 0 ? void 0 : _b.call(page, param, () => {
                var _a;
                pageEl = this.getPageContainer(page);
                this.addAnimation(pageEl, pageNo === 0);
                (_a = page.onShow) === null || _a === void 0 ? void 0 : _a.call(page);
                this.navigationBarHandler.load();
                this.onReady(page, false);
                this.bindPageEvents(page, pageConfig);
                this.triggerRouterChange();
            });
        }
    }
    hide(page, animation = false) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!page)
            return;
        // NOTE: 修复多页并发问题，此处可能因为路由跳转过快，执行时页面可能还没有创建成功
        const pageEl = this.getPageContainer(page);
        if (pageEl) {
            if (animation) {
                if (this.hideTimer) {
                    clearTimeout(this.hideTimer);
                    this.hideTimer = null;
                    (_c = (_b = (_a = this.lastHidePage) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.add) === null || _c === void 0 ? void 0 : _c.call(_b, 'taro_page_shade');
                }
                this.lastHidePage = pageEl;
                this.hideTimer = setTimeout(() => {
                    this.hideTimer = null;
                    pageEl.classList.add('taro_page_shade');
                }, this.animationDuration + this.animationDelay);
                (_d = page.onHide) === null || _d === void 0 ? void 0 : _d.call(page);
            }
            else {
                if (this.hideTimer) {
                    clearTimeout(this.hideTimer);
                    this.hideTimer = null;
                    (_g = (_f = (_e = this.lastHidePage) === null || _e === void 0 ? void 0 : _e.classList) === null || _f === void 0 ? void 0 : _f.add) === null || _g === void 0 ? void 0 : _g.call(_f, 'taro_page_shade');
                }
                (_h = page.onHide) === null || _h === void 0 ? void 0 : _h.call(page);
                pageEl.classList.add('taro_page_shade');
                this.lastHidePage = pageEl;
            }
        }
        else {
            setTimeout(() => this.hide(page), 0);
        }
    }
    addAnimation(pageEl, first = false) {
        if (!pageEl)
            return;
        if (this.animation && !first) {
            setTimeout(() => {
                pageEl.classList.add('taro_page_show');
                setTimeout(() => {
                    pageEl.classList.add('taro_page_stationed');
                }, this.animationDuration);
            }, this.animationDelay);
        }
        else {
            pageEl.classList.add('taro_page_show');
            pageEl.classList.add('taro_page_stationed');
        }
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

export { PageHandler as default };
