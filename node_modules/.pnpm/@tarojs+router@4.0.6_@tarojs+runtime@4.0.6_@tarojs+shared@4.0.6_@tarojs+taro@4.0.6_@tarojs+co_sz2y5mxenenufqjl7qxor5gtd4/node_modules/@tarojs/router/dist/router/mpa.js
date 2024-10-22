import { __awaiter } from 'tslib';
import { incrementId, eventCenter, createPageConfig, hooks, stringify, Current } from '@tarojs/runtime';
import '../utils/index.js';
import { RouterConfig } from './index.js';
import MultiPageHandler from './multi-page.js';
import { setMpaTitle } from '../utils/navigate.js';

const createStampId = incrementId();
const launchStampId = createStampId();
// TODO 支持多路由 (APP 生命周期仅触发一次)
/** Note: 关于多页面应用
 * - 需要配置路由映射（根目录跳转、404 页面……）
 * - app.onPageNotFound 事件不支持
 * - 应用生命周期可能多次触发
 * - TabBar 会多次加载
 * - 不支持路由动画
 */
function createMultiRouter(history, app, config, framework) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        if (typeof app.onUnhandledRejection === 'function') {
            window.addEventListener('unhandledrejection', app.onUnhandledRejection);
        }
        eventCenter.on('__taroH5SetNavigationBarTitle', setMpaTitle);
        RouterConfig.config = config;
        const handler = new MultiPageHandler(config, history);
        const launchParam = {
            path: config.pageName, // 多页面模式没新开一个页面相当于重启，所以直接使用当前页面路径
            query: handler.getQuery(launchStampId),
            scene: 0,
            shareTicket: '',
            referrerInfo: {}
        };
        eventCenter.trigger('__taroRouterLaunch', launchParam);
        (_a = app.onLaunch) === null || _a === void 0 ? void 0 : _a.call(app, launchParam);
        app.onError && window.addEventListener('error', e => { var _a; return (_a = app.onError) === null || _a === void 0 ? void 0 : _a.call(app, e.message); });
        const pathName = config.pageName;
        const pageConfig = handler.pageConfig;
        eventCenter.trigger('__taroRouterChange', {
            toLocation: {
                path: pathName
            }
        });
        let element;
        try {
            element = yield ((_b = pageConfig.load) === null || _b === void 0 ? void 0 : _b.call(pageConfig));
            if (element instanceof Array) {
                element = element[0];
            }
        }
        catch (error) {
            throw new Error(error);
        }
        if (!element)
            return;
        let enablePullDownRefresh = ((_c = config === null || config === void 0 ? void 0 : config.window) === null || _c === void 0 ? void 0 : _c.enablePullDownRefresh) || false;
        if (pageConfig) {
            setMpaTitle((_d = pageConfig.navigationBarTitleText) !== null && _d !== void 0 ? _d : document.title);
            if (typeof pageConfig.enablePullDownRefresh === 'boolean') {
                enablePullDownRefresh = pageConfig.enablePullDownRefresh;
            }
        }
        const el = (_e = element.default) !== null && _e !== void 0 ? _e : element;
        const loadConfig = Object.assign({}, pageConfig);
        delete loadConfig['path'];
        delete loadConfig['load'];
        const page = createPageConfig(enablePullDownRefresh ? hooks.call('createPullDownComponent', el, pathName, framework, handler.PullDownRefresh) : el, pathName + stringify(launchParam), {}, loadConfig);
        handler.load(page, pageConfig);
        (_f = app.onShow) === null || _f === void 0 ? void 0 : _f.call(app, launchParam);
        window.addEventListener('visibilitychange', () => {
            var _a, _b, _c;
            const currentPath = ((_a = Current.page) === null || _a === void 0 ? void 0 : _a.path) || '';
            const path = currentPath.substring(0, currentPath.indexOf('?'));
            const param = {};
            // app的 onShow/onHide 生命周期的路径信息为当前页面的路径
            Object.assign(param, launchParam, { path });
            if (document.visibilityState === 'visible') {
                (_b = app.onShow) === null || _b === void 0 ? void 0 : _b.call(app, param);
            }
            else {
                (_c = app.onHide) === null || _c === void 0 ? void 0 : _c.call(app, param);
            }
        });
    });
}

export { createMultiRouter };
