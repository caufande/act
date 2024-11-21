import { __awaiter } from 'tslib';
import { addLeadingSlash } from '@tarojs/runtime';
import { EventChannel } from '@tarojs/shared';
import { parsePath } from 'history';
import { history, prependBasename } from './history.js';
import { RouterConfig } from './router/index.js';
import stacks from './router/stack.js';
import { routesAlias } from './utils/index.js';

const routeEvtChannel = EventChannel.routeChannel;
function processNavigateUrl(option) {
    var _a;
    const pathPieces = parsePath(option.url);
    // 处理相对路径
    if ((_a = pathPieces.pathname) === null || _a === void 0 ? void 0 : _a.includes('./')) {
        const parts = routesAlias.getOrigin(history.location.pathname).split('/');
        parts.pop();
        pathPieces.pathname.split('/').forEach((item) => {
            if (item === '.')
                return;
            item === '..' ? parts.pop() : parts.push(item);
        });
        pathPieces.pathname = parts.join('/');
    }
    // 确保是 / 开头的路径
    pathPieces.pathname = addLeadingSlash(pathPieces.pathname);
    // 处理自定义路由
    pathPieces.pathname = routesAlias.getAlias(addLeadingSlash(pathPieces.pathname));
    // 处理 basename
    pathPieces.pathname = prependBasename(pathPieces.pathname);
    // hack fix history v5 bug: https://github.com/remix-run/history/issues/814
    if (!pathPieces.search)
        pathPieces.search = '';
    return pathPieces;
}
function navigate(option, method) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            stacks.method = method;
            const { success, complete, fail } = option;
            const unListen = history.listen(() => {
                const res = { errMsg: `${method}:ok` };
                if (method === 'navigateTo') {
                    res.eventChannel = routeEvtChannel;
                    routeEvtChannel.addEvents(option.events);
                }
                success === null || success === void 0 ? void 0 : success(res);
                complete === null || complete === void 0 ? void 0 : complete(res);
                resolve(res);
                unListen();
            });
            try {
                if ('url' in option) {
                    const pathPieces = processNavigateUrl(option);
                    const state = { timestamp: Date.now() };
                    if (method === 'navigateTo') {
                        // Note: 由于 spa 会针对弱网情况下，短时间内多次跳转同一个页面跳转加了锁，后续如果有用户反馈返回无效，那可能是这个问题
                        history.push(pathPieces, state);
                    }
                    else if (method === 'redirectTo' || method === 'switchTab') {
                        history.replace(pathPieces, state);
                    }
                    else if (method === 'reLaunch') {
                        stacks.delta = stacks.length;
                        history.replace(pathPieces, state);
                    }
                }
                else if (method === 'navigateBack') {
                    stacks.delta = option.delta;
                    if (stacks.length > option.delta) {
                        history.go(-option.delta);
                    }
                    else {
                        history.go(1 - stacks.length);
                    }
                }
            }
            catch (error) {
                const res = { errMsg: `${method}:fail ${error.message || error}` };
                fail === null || fail === void 0 ? void 0 : fail(res);
                complete === null || complete === void 0 ? void 0 : complete(res);
                if (fail || complete) {
                    return resolve(res);
                }
                else {
                    return reject(res);
                }
            }
        });
    });
}
function navigateTo(option) {
    return navigate(option, 'navigateTo');
}
function redirectTo(option) {
    return navigate(option, 'redirectTo');
}
function navigateBack(option = { delta: 1 }) {
    if (!option.delta || option.delta < 1) {
        option.delta = 1;
    }
    return navigate(option, 'navigateBack');
}
function switchTab(option) {
    return navigate(option, 'switchTab');
}
function reLaunch(option) {
    return navigate(option, 'reLaunch');
}
function getCurrentPages() {
    if (process.env.NODE_ENV !== 'production' && RouterConfig.mode === 'multi') {
        console.warn('多页面路由模式不支持使用 getCurrentPages 方法！');
    }
    const pages = stacks.get();
    return pages.map(e => { var _a; return (Object.assign(Object.assign({}, e), { route: ((_a = e.path) === null || _a === void 0 ? void 0 : _a.replace(/\?.*/g, '')) || '' })); });
}

export { getCurrentPages, navigateBack, navigateTo, reLaunch, redirectTo, switchTab };
