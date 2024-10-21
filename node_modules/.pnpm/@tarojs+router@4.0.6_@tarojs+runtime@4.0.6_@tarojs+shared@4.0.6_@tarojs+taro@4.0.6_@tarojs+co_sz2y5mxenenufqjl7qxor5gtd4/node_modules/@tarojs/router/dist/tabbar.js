import { defineCustomElementTaroTabbar } from '@tarojs/components/dist/components';
import { initTabBarApis } from '@tarojs/taro';

function initTabbar(config, history) {
    if (config.tabBar == null || config.tabBar.custom) {
        return;
    }
    // TODO: custom-tab-bar
    defineCustomElementTaroTabbar();
    const tabbar = document.createElement('taro-tabbar');
    const homePage = config.entryPagePath || (config.pages ? config.pages[0] : '');
    tabbar.conf = config.tabBar;
    tabbar.conf.homePage = history.location.pathname === '/' ? homePage : history.location.pathname;
    const routerConfig = config.router;
    tabbar.conf.mode = routerConfig && routerConfig.mode ? routerConfig.mode : 'hash';
    if (routerConfig.customRoutes) {
        tabbar.conf.custom = true;
        tabbar.conf.customRoutes = routerConfig.customRoutes;
    }
    else {
        tabbar.conf.custom = false;
        tabbar.conf.customRoutes = {};
    }
    if (typeof routerConfig.basename !== 'undefined') {
        tabbar.conf.basename = routerConfig.basename;
    }
    const container = document.getElementById('container');
    container === null || container === void 0 ? void 0 : container.appendChild(tabbar);
    initTabBarApis(config);
}

export { initTabbar };
