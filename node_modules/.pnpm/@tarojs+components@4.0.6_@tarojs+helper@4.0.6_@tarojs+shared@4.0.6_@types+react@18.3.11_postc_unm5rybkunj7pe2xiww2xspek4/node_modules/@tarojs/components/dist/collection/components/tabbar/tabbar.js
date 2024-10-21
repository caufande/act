import { h, Host } from '@stencil/core';
import { addLeadingSlash, getCurrentPage, stripBasename, stripSuffix } from '@tarojs/runtime';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import resolvePathname from 'resolve-pathname';
import { splitUrl } from '../../utils';
import { TabbarItem } from './tabbar-item';
const STATUS_SHOW = 0;
const STATUS_HIDE = 1;
const STATUS_SLIDEOUT = 2;
const basicTabBarClassName = 'taro-tabbar__tabbar';
const hideTabBarClassName = 'taro-tabbar__tabbar-hide';
const hideTabBarWithAnimationClassName = 'taro-tabbar__tabbar-slideout';
export class Tabbar {
  constructor() {
    this.homePage = '';
    this.customRoutes = [];
    this.tabbarPos = 'bottom';
    this.getOriginUrl = (url) => {
      const customRoute = this.customRoutes.filter(([, customUrl]) => {
        const pathA = splitUrl(customUrl).path;
        const pathB = splitUrl(url).path;
        return pathA === pathB;
      });
      return stripSuffix(customRoute.length ? customRoute[0][0] : url, '.html');
    };
    this.getSelectedIndex = (url) => {
      let foundIndex = -1;
      this.list.forEach(({ pagePath }, idx) => {
        const pathA = splitUrl(url).path;
        const pathB = splitUrl(pagePath).path;
        if (pathA === pathB) {
          foundIndex = idx;
        }
      });
      return foundIndex;
    };
    this.switchTab = (index) => {
      this.selectedIndex = index;
      Taro.switchTab({
        url: this.list[index].pagePath
      });
    };
    this.switchTabHandler = ({ url, successHandler, errorHandler }) => {
      const currentUrl = this.getOriginUrl(this.getCurrentUrl() || this.homePage);
      const nextTab = resolvePathname(url, currentUrl);
      const foundIndex = this.getSelectedIndex(nextTab);
      if (foundIndex > -1) {
        this.switchTab(foundIndex);
        successHandler({
          errMsg: 'switchTab:ok'
        });
      }
      else {
        errorHandler({
          errMsg: `switchTab:fail page "${nextTab}" is not found`
        });
      }
    };
    this.routerChangeHandler = (options) => {
      var _a;
      const to = (_a = options === null || options === void 0 ? void 0 : options.toLocation) === null || _a === void 0 ? void 0 : _a.path;
      let currentPage;
      if (typeof to === 'string') {
        const routerBasename = this.conf.basename || '/';
        currentPage = stripBasename(addLeadingSlash(to || this.homePage), routerBasename) || '/';
      }
      else {
        currentPage = this.getCurrentUrl();
      }
      this.selectedIndex = this.getSelectedIndex(this.getOriginUrl(currentPage));
    };
    this.setTabBarBadgeHandler = ({ index, text, successHandler, errorHandler }) => {
      const list = [...this.list];
      if (index in list) {
        list[index].showRedDot = false;
        list[index].badgeText = text;
        successHandler({
          errMsg: 'setTabBarBadge:ok'
        });
      }
      else {
        errorHandler({
          errMsg: 'setTabBarBadge:fail tabbar item not found'
        });
      }
      this.list = list;
    };
    this.removeTabBarBadgeHandler = ({ index, successHandler, errorHandler }) => {
      const list = [...this.list];
      if (index in list) {
        list[index].badgeText = null;
        list[index].badgeText = null;
        successHandler({
          errMsg: 'removeTabBarBadge:ok'
        });
      }
      else {
        errorHandler({
          errMsg: 'removeTabBarBadge:fail tabbar item not found'
        });
      }
      this.list = list;
    };
    this.showTabBarRedDotHandler = ({ index, successHandler, errorHandler }) => {
      const list = [...this.list];
      if (index in list) {
        list[index].badgeText = null;
        list[index].showRedDot = true;
        successHandler({
          errMsg: 'showTabBarRedDot:ok'
        });
      }
      else {
        errorHandler({
          errMsg: 'showTabBarRedDot:fail tabbar item not found'
        });
      }
      this.list = list;
    };
    this.hideTabBarRedDotHandler = ({ index, successHandler, errorHandler }) => {
      const list = [...this.list];
      if (index in list) {
        list[index].showRedDot = false;
        successHandler({
          errMsg: 'hideTabBarRedDot:ok'
        });
      }
      else {
        errorHandler({
          errMsg: 'hideTabBarRedDot:fail tabbar item not found'
        });
      }
      this.list = list;
    };
    this.showTabBarHandler = ({ successHandler }) => {
      this.status = STATUS_SHOW;
      successHandler({
        errMsg: 'showTabBar:ok'
      });
    };
    this.hideTabBarHandler = ({ animation, successHandler }) => {
      this.status = animation ? STATUS_SLIDEOUT : STATUS_HIDE;
      successHandler({
        errMsg: 'hideTabBar:ok'
      });
    };
    this.setTabBarStyleHandler = ({ color, selectedColor, backgroundColor, borderStyle, successHandler }) => {
      if (backgroundColor)
        this.backgroundColor = backgroundColor;
      if (borderStyle)
        this.borderStyle = borderStyle;
      if (color)
        this.color = color;
      if (selectedColor)
        this.selectedColor = selectedColor;
      successHandler({
        errMsg: 'setTabBarStyle:ok'
      });
    };
    this.setTabBarItemHandler = ({ index, iconPath, selectedIconPath, text, successHandler, errorHandler }) => {
      const list = [...this.list];
      if (index in list) {
        if (iconPath)
          list[index].iconPath = iconPath;
        if (selectedIconPath)
          list[index].selectedIconPath = selectedIconPath;
        if (text)
          list[index].text = text;
        successHandler({
          errMsg: 'setTabBarItem:ok'
        });
      }
      else {
        errorHandler({
          errMsg: 'setTabBarItem:fail tabbar item not found'
        });
      }
      this.list = list;
    };
    this.conf = undefined;
    this.list = undefined;
    this.borderStyle = undefined;
    this.backgroundColor = undefined;
    this.color = undefined;
    this.selectedColor = undefined;
    this.selectedIndex = -1;
    this.status = STATUS_SHOW;
  }
  componentWillLoad() {
    var _a, _b;
    const list = ((_a = this.conf) === null || _a === void 0 ? void 0 : _a.list) || [];
    const customRoutes = ((_b = this.conf) === null || _b === void 0 ? void 0 : _b.customRoutes) || {};
    if (Object.prototype.toString.call(list) !== '[object Array]' ||
      list.length < 2 ||
      list.length > 5) {
      throw new Error('tabBar 配置错误');
    }
    this.homePage = addLeadingSlash(this.conf.homePage);
    for (let key in customRoutes) {
      const path = customRoutes[key];
      key = addLeadingSlash(key);
      if (typeof path === 'string') {
        this.customRoutes.push([key, addLeadingSlash(path)]);
      }
      else if ((path === null || path === void 0 ? void 0 : path.length) > 0) {
        this.customRoutes.push(...path.map(p => [key, addLeadingSlash(p)]));
      }
    }
    list.forEach(item => {
      if (item.pagePath.indexOf('/') !== 0) {
        item.pagePath = '/' + item.pagePath;
      }
    });
    this.list = list;
    this.borderStyle = this.conf.borderStyle;
    this.backgroundColor = this.conf.backgroundColor;
    this.color = this.conf.color;
    this.selectedColor = this.conf.selectedColor;
  }
  getCurrentUrl() {
    const routePath = getCurrentPage(this.conf.mode, this.conf.basename);
    return decodeURI(routePath === '/' ? this.homePage : routePath);
  }
  bindEvent() {
    Taro.eventCenter.on('__taroRouterChange', this.routerChangeHandler);
    Taro.eventCenter.on('__taroSwitchTab', this.switchTabHandler);
    Taro.eventCenter.on('__taroSetTabBarBadge', this.setTabBarBadgeHandler);
    Taro.eventCenter.on('__taroRemoveTabBarBadge', this.removeTabBarBadgeHandler);
    Taro.eventCenter.on('__taroShowTabBarRedDotHandler', this.showTabBarRedDotHandler);
    Taro.eventCenter.on('__taroHideTabBarRedDotHandler', this.hideTabBarRedDotHandler);
    Taro.eventCenter.on('__taroShowTabBar', this.showTabBarHandler);
    Taro.eventCenter.on('__taroHideTabBar', this.hideTabBarHandler);
    Taro.eventCenter.on('__taroSetTabBarStyle', this.setTabBarStyleHandler);
    Taro.eventCenter.on('__taroSetTabBarItem', this.setTabBarItemHandler);
  }
  removeEvent() {
    Taro.eventCenter.off('__taroRouterChange', this.routerChangeHandler);
    Taro.eventCenter.off('__taroSwitchTab', this.switchTabHandler);
    Taro.eventCenter.off('__taroSetTabBarBadge', this.setTabBarBadgeHandler);
    Taro.eventCenter.off('__taroRemoveTabBarBadge', this.removeTabBarBadgeHandler);
    Taro.eventCenter.off('__taroShowTabBarRedDotHandler', this.showTabBarRedDotHandler);
    Taro.eventCenter.off('__taroHideTabBarRedDotHandler', this.hideTabBarRedDotHandler);
    Taro.eventCenter.off('__taroShowTabBar', this.showTabBarHandler);
    Taro.eventCenter.off('__taroHideTabBar', this.hideTabBarHandler);
    Taro.eventCenter.off('__taroSetTabBarStyle', this.setTabBarStyleHandler);
    Taro.eventCenter.off('__taroSetTabBarItem', this.setTabBarItemHandler);
  }
  componentDidLoad() {
    this.tabbarPos = this.tabbar.nextElementSibling ? 'top' : 'bottom';
    this.bindEvent();
    this.routerChangeHandler();
  }
  disconnectedCallback() {
    this.removeEvent();
  }
  render() {
    const { tabbarPos = 'bottom' } = this;
    const status = this.status;
    const containerCls = classNames('weui-tabbar', {
      [`taro-tabbar__border-${this.borderStyle || 'black'}`]: true
    });
    const shouldHideTabBar = this.selectedIndex === -1 || status === STATUS_HIDE;
    const shouldSlideout = status === STATUS_SLIDEOUT;
    return (h(Host, { class: classNames(basicTabBarClassName, `${basicTabBarClassName}-${tabbarPos}`, {
        [hideTabBarClassName]: shouldHideTabBar,
        [hideTabBarWithAnimationClassName]: shouldSlideout
      }) }, h("div", { class: containerCls, style: {
        backgroundColor: this.backgroundColor || '',
        height: 'inherit'
      } }, this.list.map((item, index) => {
      const isSelected = this.selectedIndex === index;
      let textColor;
      let iconPath;
      if (isSelected) {
        textColor = this.selectedColor || '';
        iconPath = item.selectedIconPath;
      }
      else {
        textColor = this.color || '';
        iconPath = item.iconPath;
      }
      return (h(TabbarItem, { index: index, onSelect: this.switchTab.bind(this), isSelected: isSelected, textColor: textColor, iconPath: iconPath, pagePath: item.pagePath, text: item.text, badgeText: item.badgeText, showRedDot: item.showRedDot }));
    }))));
  }
  static get is() { return "taro-tabbar"; }
  static get originalStyleUrls() {
    return {
      "$": ["./style/index.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["./style/index.css"]
    };
  }
  static get properties() {
    return {
      "conf": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ITabBarConf",
          "resolved": "ITabBarConf",
          "references": {
            "ITabBarConf": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get states() {
    return {
      "list": {},
      "borderStyle": {},
      "backgroundColor": {},
      "color": {},
      "selectedColor": {},
      "selectedIndex": {},
      "status": {}
    };
  }
  static get events() {
    return [{
        "method": "onLongPress",
        "name": "longpress",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "tabbar"; }
}
