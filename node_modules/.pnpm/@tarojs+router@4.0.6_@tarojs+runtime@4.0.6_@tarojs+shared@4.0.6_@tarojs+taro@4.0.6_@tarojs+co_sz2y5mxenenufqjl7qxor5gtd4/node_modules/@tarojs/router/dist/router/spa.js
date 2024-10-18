import { __awaiter } from 'tslib';
import { incrementId, addLeadingSlash, eventCenter, stripBasename, Current, safeExecute, createPageConfig, hooks, stringify } from '@tarojs/runtime';
import { Action } from 'history';
import UniversalRouter from 'universal-router';
import { prependBasename } from '../history.js';
import { routesAlias } from '../utils/index.js';
import { RouterConfig } from './index.js';
import PageHandler from './page.js';
import stacks from './stack.js';

const createStampId = incrementId();
let launchStampId = createStampId();
function createRouter(history, app, config, framework) {
    var _a, _b;
    if (typeof app.onUnhandledRejection === 'function') {
        window.addEventListener('unhandledrejection', app.onUnhandledRejection);
    }
    RouterConfig.config = config;
    const handler = new PageHandler(config, history);
    // Note: 弱网情况下，快速切换 tab，会造成同个页面实例被多次挂在到页面上，原因是资源请求是异步的，短时间内发起多个请求，
    // 会在资源加载完成后，同时走到挂载的逻辑，造成 pageStampId 更新不及时，两个 page 的Id 相同，后面很多操作是通过 getElementById 来进行的
    // 所以需要加一个锁来应对这个情况
    const pageLock = {};
    routesAlias.set(handler.router.customRoutes);
    const basename = handler.router.basename;
    const routes = handler.routes.map(route => {
        const routePath = addLeadingSlash(route.path);
        const paths = routesAlias.getAll(routePath);
        return {
            path: paths.length < 1 ? routePath : paths,
            action: route.load
        };
    });
    const router = new UniversalRouter(routes, { baseUrl: basename || '' });
    const launchParam = {
        path: handler.currentPage,
        query: handler.getQuery(launchStampId),
        scene: 0,
        shareTicket: '',
        referrerInfo: {}
    };
    eventCenter.trigger('__taroRouterLaunch', launchParam);
    (_a = app.onLaunch) === null || _a === void 0 ? void 0 : _a.call(app, launchParam);
    app.onError && window.addEventListener('error', e => { var _a; return (_a = app.onError) === null || _a === void 0 ? void 0 : _a.call(app, e.message); });
    const render = (_c) => __awaiter(this, [_c], void 0, function* ({ location, action }) {
        var _d, _e, _f, _g, _h, _j, _k, _l;
        // Note: 由于下面有异步加载操作 先不要在这里去设置 handler.pathname
        const currentPathname = decodeURI(location.pathname);
        if ((_d = window.__taroAppConfig) === null || _d === void 0 ? void 0 : _d.usingWindowScroll)
            window.scrollTo(0, 0);
        eventCenter.trigger('__taroRouterChange', {
            toLocation: {
                path: currentPathname
            }
        });
        let element, context, params;
        const routerPath = handler.router.forcePath || currentPathname;
        pageLock[routerPath] = typeof pageLock[routerPath] === 'number' ? pageLock[routerPath] + 1 : 1;
        const currentLock = pageLock[routerPath];
        let postLock;
        try {
            const result = yield router.resolve(routerPath);
            [element, context, params] = yield Promise.all(result);
            postLock = pageLock[routerPath];
        }
        catch (error) {
            if (error.status === 404) {
                const notFoundEvent = {
                    isEntryPage: stacks.length === 0,
                    path: currentPathname,
                    query: handler.getQuery(createStampId()),
                };
                (_e = app.onPageNotFound) === null || _e === void 0 ? void 0 : _e.call(app, notFoundEvent);
                eventCenter.trigger('__taroRouterNotFound', notFoundEvent);
            }
            else if (/Loading hot update .* failed./.test(error.message)) {
                // NOTE: webpack5 与 prebundle 搭配使用时，开发环境下初次启动时偶发错误，由于 HMR 加载 chunk hash 错误，导致热更新失败
                window.location.reload();
            }
            else {
                throw error;
            }
        }
        if (!element || currentLock !== postLock)
            return;
        // Note: 异步结束后，在设置 handler.pathname
        // context.pathname 在 universal-router 被处理过了，是发起资源请求的时候传入的 pathname，即 await router.resolve(routerPath) 这个 routerPath
        handler.pathname = context.pathname;
        const { pathname, pageConfig } = handler;
        let enablePullDownRefresh = ((_f = config === null || config === void 0 ? void 0 : config.window) === null || _f === void 0 ? void 0 : _f.enablePullDownRefresh) || false;
        let navigationStyle = ((_g = config === null || config === void 0 ? void 0 : config.window) === null || _g === void 0 ? void 0 : _g.navigationStyle) || 'default';
        let navigationBarTextStyle = ((_h = config === null || config === void 0 ? void 0 : config.window) === null || _h === void 0 ? void 0 : _h.navigationBarTextStyle) || 'white';
        let navigationBarBackgroundColor = ((_j = config === null || config === void 0 ? void 0 : config.window) === null || _j === void 0 ? void 0 : _j.navigationBarBackgroundColor) || '#000000';
        if (pageConfig) {
            if (typeof pageConfig.enablePullDownRefresh === 'boolean') {
                enablePullDownRefresh = pageConfig.enablePullDownRefresh;
            }
            if (typeof pageConfig.navigationStyle === 'string') {
                navigationStyle = pageConfig.navigationStyle;
            }
            if (typeof pageConfig.navigationBarTextStyle === 'string') {
                navigationBarTextStyle = pageConfig.navigationBarTextStyle;
            }
            if (typeof pageConfig.navigationBarBackgroundColor === 'string') {
                navigationBarBackgroundColor = pageConfig.navigationBarBackgroundColor;
            }
        }
        eventCenter.trigger('__taroSetNavigationStyle', navigationStyle, navigationBarTextStyle, navigationBarBackgroundColor);
        const currentPage = Current.page;
        const methodName = (_k = stacks.method) !== null && _k !== void 0 ? _k : '';
        const cacheTabs = stacks.getTabs();
        let shouldLoad = false;
        stacks.method = '';
        if (methodName === 'reLaunch') {
            handler.unload(currentPage, stacks.length);
            // NOTE: 同时卸载缓存在tabs里面的页面实例
            for (const key in cacheTabs) {
                if (cacheTabs[key]) {
                    handler.unload(cacheTabs[key]);
                    stacks.removeTab(key);
                }
            }
            shouldLoad = true;
        }
        else if (currentPage && handler.isTabBar(pathname)) {
            if (handler.isSamePage(currentPage))
                return;
            if (handler.isTabBar(currentPage.path)) {
                // NOTE: 从 tabBar 页面切换到 tabBar 页面
                handler.hide(currentPage);
                stacks.pushTab(currentPage.path.split('?')[0]);
            }
            else if (stacks.length > 0) {
                const firstIns = stacks.getItem(0);
                if (handler.isTabBar(firstIns.path)) {
                    handler.unload(currentPage, stacks.length - 1, true);
                    stacks.pushTab(firstIns.path.split('?')[0]);
                }
                else {
                    handler.unload(currentPage, stacks.length, true);
                }
            }
            if (cacheTabs[pathname]) {
                stacks.popTab(pathname);
                return handler.show(stacks.getItem(0), pageConfig, 0);
            }
            shouldLoad = true;
        }
        else if (action === 'POP') {
            // NOTE: 浏览器事件退后多次时，该事件只会被触发一次
            const prevIndex = stacks.getPrevIndex(pathname);
            const delta = stacks.getDelta(pathname);
            // NOTE: Safari 内核浏览器在非应用页面返回上一页时，会触发额外的 POP 事件，此处需避免当前页面被错误卸载
            if (currentPage !== stacks.getItem(prevIndex)) {
                handler.unload(currentPage, delta, prevIndex > -1);
                if (prevIndex > -1) {
                    eventCenter.once('__taroPageOnShowAfterDestroyed', () => {
                        handler.show(stacks.getItem(prevIndex), pageConfig, prevIndex);
                    });
                }
                else {
                    shouldLoad = true;
                }
            }
        }
        else if (action === 'REPLACE') {
            const delta = stacks.getDelta(pathname);
            // NOTE: 页面路由记录并不会清空，只是移除掉缓存的 stack 以及页面
            handler.unload(currentPage, delta);
            shouldLoad = true;
        }
        else if (action === 'PUSH') {
            handler.hide(currentPage, true);
            shouldLoad = true;
        }
        if (shouldLoad || stacks.length < 1) {
            const el = (_l = element.default) !== null && _l !== void 0 ? _l : element;
            const loadConfig = Object.assign({}, pageConfig);
            const stacksIndex = stacks.length;
            delete loadConfig['path'];
            delete loadConfig['load'];
            let pageStampId = '';
            if (launchStampId) {
                pageStampId = launchStampId;
                launchStampId = '';
            }
            else {
                pageStampId = createStampId();
            }
            const page = createPageConfig(enablePullDownRefresh ? hooks.call('createPullDownComponent', el, pathname, framework, handler.PullDownRefresh, pageStampId) : el, pathname + stringify(handler.getQuery(pageStampId)), {}, loadConfig);
            if (params)
                page.options = params;
            handler.load(page, pageConfig, pageStampId, stacksIndex);
        }
    });
    const routePath = addLeadingSlash(stripBasename(history.location.pathname, handler.basename));
    if (routePath === '/') {
        history.replace(prependBasename(handler.homePage + history.location.search));
    }
    render({ location: history.location, action: Action.Push });
    (_b = app.onShow) === null || _b === void 0 ? void 0 : _b.call(app, launchParam);
    window.addEventListener('visibilitychange', () => {
        var _a, _b, _c, _d, _e, _f, _g;
        const currentPath = ((_a = Current.page) === null || _a === void 0 ? void 0 : _a.path) || '';
        const path = currentPath.substring(0, currentPath.indexOf('?'));
        const param = {};
        // app的 onShow/onHide 生命周期的路径信息为当前页面的路径
        Object.assign(param, launchParam, { path });
        if (document.visibilityState === 'visible') {
            (_b = app.onShow) === null || _b === void 0 ? void 0 : _b.call(app, param);
            // 单页面app显示后一刻会触发当前 page.onShow 生命周期函数
            (_d = (_c = Current.page) === null || _c === void 0 ? void 0 : _c.onShow) === null || _d === void 0 ? void 0 : _d.call(_c);
        }
        else {
            // 单页面app隐藏前一刻会触发当前 page.onHide 生命周期函数
            if ((_e = Current.page) === null || _e === void 0 ? void 0 : _e.path) {
                safeExecute((_f = Current.page) === null || _f === void 0 ? void 0 : _f.path, 'onHide');
            }
            (_g = app.onHide) === null || _g === void 0 ? void 0 : _g.call(app, param);
        }
    });
    return history.listen(render);
}

export { createRouter };
