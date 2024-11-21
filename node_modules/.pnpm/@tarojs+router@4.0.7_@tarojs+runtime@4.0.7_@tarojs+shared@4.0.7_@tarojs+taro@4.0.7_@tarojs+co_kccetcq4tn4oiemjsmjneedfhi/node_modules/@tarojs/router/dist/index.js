import { initNavigationBar } from './navigationBar.js';
import { initTabbar } from './tabbar.js';
export { getCurrentPages, navigateBack, navigateTo, reLaunch, redirectTo, switchTab } from './api.js';
export { createMpaHistory, history, prependBasename, setHistory, setHistoryMode } from './history.js';
export { createMultiRouter } from './router/mpa.js';
export { createRouter } from './router/spa.js';
export { routesAlias } from './utils/index.js';
export { createBrowserHistory, createHashHistory } from 'history';
export { isDingTalk, isWeixin, setMpaTitle, setNavigationBarLoading, setNavigationBarStyle, setTitle } from './utils/navigate.js';

function handleAppMount(config, _, appId = config.appId || 'app') {
    let app = document.getElementById(appId);
    let isPosition = true;
    if (!app) {
        app = document.createElement('div');
        app.id = appId;
        isPosition = false;
    }
    const appWrapper = ((app === null || app === void 0 ? void 0 : app.parentNode) || (app === null || app === void 0 ? void 0 : app.parentElement) || document.body);
    app.classList.add('taro_router');
    if (!isPosition)
        appWrapper.appendChild(app);
    initNavigationBar(config, appWrapper);
}
function handleAppMountWithTabbar(config, history, appId = config.appId || 'app') {
    let app = document.getElementById(appId);
    let isPosition = true;
    if (!app) {
        app = document.createElement('div');
        app.id = appId;
        isPosition = false;
    }
    const appWrapper = ((app === null || app === void 0 ? void 0 : app.parentNode) || (app === null || app === void 0 ? void 0 : app.parentElement) || document.body);
    app.classList.add('taro_router');
    const container = document.createElement('div');
    container.classList.add('taro-tabbar__container');
    container.id = 'container';
    const panel = document.createElement('div');
    panel.classList.add('taro-tabbar__panel');
    panel.appendChild(app.cloneNode(true));
    container.appendChild(panel);
    if (!isPosition) {
        appWrapper.appendChild(container);
    }
    else {
        appWrapper.replaceChild(container, app);
    }
    initTabbar(config, history);
    initNavigationBar(config, container);
}

export { handleAppMount, handleAppMountWithTabbar };
