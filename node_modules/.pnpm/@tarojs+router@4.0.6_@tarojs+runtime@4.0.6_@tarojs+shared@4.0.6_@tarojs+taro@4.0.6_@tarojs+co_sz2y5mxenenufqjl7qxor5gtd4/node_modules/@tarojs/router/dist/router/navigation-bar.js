import { eventCenter } from '@tarojs/runtime';
import { reLaunch, navigateBack } from '../api.js';
import '../utils/index.js';
import stacks from './stack.js';
import { isDingTalk } from '../utils/navigate.js';

class NavigationBarHandler {
    constructor(pageContext) {
        this.isLoadDdEntry = false;
        this.cache = {};
        this.pageContext = pageContext;
        this.init();
        eventCenter.on('__taroH5SetNavigationBarTitle', (title) => {
            this.setTitle(title);
        });
        eventCenter.on('__taroH5setNavigationBarLoading', (loading) => {
            this.setNavigationLoading(loading);
        });
        eventCenter.on('__taroH5setNavigationBarColor', ({ backgroundColor, frontColor }) => {
            if (typeof backgroundColor === 'string')
                this.setNavigationBarBackground(backgroundColor);
            if (typeof frontColor === 'string')
                this.setNavigationBarTextStyle(frontColor);
        });
    }
    toHomeFn() {
        reLaunch({ url: this.pageContext.originHomePage });
    }
    backFn() {
        navigateBack();
    }
    get homeBtnElement() {
        var _a;
        if (!this.navigationBarElement)
            return null;
        return (_a = this.navigationBarElement.getElementsByClassName('taro-navigation-bar-home')) === null || _a === void 0 ? void 0 : _a[0];
    }
    get backBtnElement() {
        var _a;
        if (!this.navigationBarElement)
            return null;
        return (_a = this.navigationBarElement.getElementsByClassName('taro-navigation-bar-back')) === null || _a === void 0 ? void 0 : _a[0];
    }
    get titleElement() {
        var _a;
        if (!this.navigationBarElement)
            return null;
        return (_a = this.navigationBarElement.getElementsByClassName('taro-navigation-bar-title')) === null || _a === void 0 ? void 0 : _a[0];
    }
    get loadingElement() {
        if (!this.navigationBarElement)
            return null;
        return this.navigationBarElement.getElementsByClassName('taro-navigation-bar-loading')[0];
    }
    init() {
        var _a, _b;
        this.setNavigationBarElement();
        if (!this.navigationBarElement)
            return;
        (_a = this.homeBtnElement) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.toHomeFn.bind(this));
        (_b = this.backBtnElement) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.backFn.bind(this));
    }
    setNavigationBarElement() {
        this.navigationBarElement = document.getElementById('taro-navigation-bar');
    }
    load() {
        this.setCacheValue();
        this.setTitle();
        this.setNavigationBarVisible();
        this.setFnBtnState();
        this.setNavigationBarBackground();
        this.setNavigationBarTextStyle();
        this.setNavigationLoading();
    }
    setCacheValue() {
        const currentPage = this.pageContext.originPathname;
        if (typeof this.cache[currentPage] !== 'object') {
            this.cache[currentPage] = {};
        }
    }
    setFnBtnState() {
        const currentRouter = this.pageContext.currentPage;
        if (this.pageContext.isTabBar(currentRouter) || this.pageContext.homePage === currentRouter) {
            this.fnBtnToggleToNone();
        }
        else if (stacks.length > 1) {
            this.fnBtnToggleToBack();
        }
        else {
            this.fnBtnToggleToHome();
        }
    }
    shiftLoadingState(show) {
        if (!this.loadingElement)
            return;
        if (show) {
            this.loadingElement.classList.add('taro-navigation-bar-loading-show');
        }
        else {
            this.loadingElement.classList.remove('taro-navigation-bar-loading-show');
        }
    }
    setNavigationLoading(show) {
        var _a;
        if (!this.navigationBarElement)
            return;
        const currentPage = this.pageContext.originPathname;
        let isShow;
        if (typeof show === 'boolean') {
            isShow = show;
            this.cache[currentPage] &&
                (this.cache[currentPage].loading = isShow);
        }
        else {
            const cacheValue = (_a = this.cache[currentPage]) === null || _a === void 0 ? void 0 : _a.loading;
            if (typeof cacheValue === 'boolean') {
                isShow = cacheValue;
            }
            else {
                // 默认值为 false
                isShow = false;
                this.cache[currentPage] &&
                    (this.cache[currentPage].loading = isShow);
            }
        }
        this.shiftLoadingState(isShow);
    }
    setNavigationBarBackground(backgroundColor) {
        var _a, _b, _c;
        if (!this.navigationBarElement)
            return;
        const currentPage = this.pageContext.originPathname;
        let color;
        if (typeof backgroundColor === 'string') {
            color = backgroundColor;
            this.cache[currentPage] &&
                (this.cache[currentPage].backgroundColor = color);
        }
        else {
            const cacheValue = (_a = this.cache[currentPage]) === null || _a === void 0 ? void 0 : _a.backgroundColor;
            if (typeof cacheValue === 'string') {
                color = cacheValue;
            }
            else {
                color = ((_c = (_b = this.pageContext.config) === null || _b === void 0 ? void 0 : _b.window) === null || _c === void 0 ? void 0 : _c.navigationBarBackgroundColor) || '#000000';
                this.cache[currentPage] &&
                    (this.cache[currentPage].backgroundColor = color);
            }
        }
        this.navigationBarElement.style.background = color;
    }
    setNavigationBarTextStyle(fontColor) {
        var _a, _b, _c;
        if (!this.navigationBarElement)
            return;
        const currentPage = this.pageContext.originPathname;
        let color;
        if (typeof fontColor === 'string') {
            color = fontColor;
            this.cache[currentPage] &&
                (this.cache[currentPage].fontColor = color);
        }
        else {
            const cacheValue = (_a = this.cache[currentPage]) === null || _a === void 0 ? void 0 : _a.fontColor;
            if (typeof cacheValue === 'string') {
                color = cacheValue;
            }
            else {
                color = ((_c = (_b = this.pageContext.config) === null || _b === void 0 ? void 0 : _b.window) === null || _c === void 0 ? void 0 : _c.navigationBarTextStyle) || 'white';
                this.cache[currentPage] &&
                    (this.cache[currentPage].fontColor = color);
            }
        }
        this.navigationBarElement.style.color = color;
    }
    setTitle(title) {
        var _a, _b, _c;
        const currentPage = this.pageContext.originPathname;
        let proceedTitle;
        if (typeof title === 'string') {
            proceedTitle = title;
            this.cache[currentPage] &&
                (this.cache[currentPage].title = proceedTitle);
        }
        else {
            const cacheValue = (_a = this.cache[currentPage]) === null || _a === void 0 ? void 0 : _a.title;
            if (typeof cacheValue === 'string') {
                proceedTitle = cacheValue;
            }
            else {
                proceedTitle = (_c = (_b = this.pageContext.pageConfig) === null || _b === void 0 ? void 0 : _b.navigationBarTitleText) !== null && _c !== void 0 ? _c : document.title;
                this.cache[currentPage] &&
                    (this.cache[currentPage].title = proceedTitle);
            }
        }
        if (process.env.SUPPORT_DINGTALK_NAVIGATE !== 'disabled' && isDingTalk()) {
            if (!this.isLoadDdEntry) {
                this.isLoadDdEntry = true;
                require('dingtalk-jsapi/platform');
            }
            const setDingTitle = require('dingtalk-jsapi/api/biz/navigation/setTitle').default;
            setDingTitle({ proceedTitle });
        }
        document.title = proceedTitle;
        if (!this.titleElement)
            return;
        this.titleElement.innerHTML = proceedTitle;
    }
    fnBtnToggleToHome() {
        if (!this.navigationBarElement)
            return;
        this.navigationBarElement.classList.add('taro-navigation-bar-home-icon');
        this.navigationBarElement.classList.remove('taro-navigation-bar-back-icon');
    }
    fnBtnToggleToBack() {
        if (!this.navigationBarElement)
            return;
        this.navigationBarElement.classList.remove('taro-navigation-bar-home-icon');
        this.navigationBarElement.classList.add('taro-navigation-bar-back-icon');
    }
    fnBtnToggleToNone() {
        if (!this.navigationBarElement)
            return;
        this.navigationBarElement.classList.remove('taro-navigation-bar-home-icon');
        this.navigationBarElement.classList.remove('taro-navigation-bar-back-icon');
    }
    setNavigationBarVisible(show) {
        var _a, _b;
        if (!this.navigationBarElement)
            return;
        let shouldShow;
        if (typeof show === 'boolean') {
            shouldShow = show;
        }
        else {
            shouldShow = (_a = this.pageContext.config.window) === null || _a === void 0 ? void 0 : _a.navigationStyle;
            if (typeof ((_b = this.pageContext.pageConfig) === null || _b === void 0 ? void 0 : _b.navigationStyle) === 'string') {
                shouldShow = this.pageContext.pageConfig.navigationStyle;
            }
        }
        if (shouldShow === 'default') {
            this.navigationBarElement.classList.add('taro-navigation-bar-show');
            this.navigationBarElement.classList.remove('taro-navigation-bar-hide');
        }
        else {
            this.navigationBarElement.classList.add('taro-navigation-bar-hide');
            this.navigationBarElement.classList.remove('taro-navigation-bar-show');
        }
    }
}

export { NavigationBarHandler as default };
