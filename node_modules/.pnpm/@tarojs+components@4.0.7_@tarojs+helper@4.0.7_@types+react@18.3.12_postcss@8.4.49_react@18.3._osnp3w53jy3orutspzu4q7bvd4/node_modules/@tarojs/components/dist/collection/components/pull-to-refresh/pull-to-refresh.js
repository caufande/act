import { h, Host } from '@stencil/core';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
function setTransform(nodeStyle, value) {
  nodeStyle.transform = value;
  nodeStyle.webkitTransform = value;
  nodeStyle.MozTransform = value;
}
const isWebView = typeof navigator !== 'undefined' &&
  /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
const INDICATOR = {
  activate: 'release',
  deactivate: 'pull',
  release: 'loading',
  finish: 'finish'
};
let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get() {
      supportsPassive = true;
    }
  });
  window.addEventListener('cancel', () => ({}), opts);
}
catch (e) { }
const willPreventDefault = supportsPassive ? { passive: false } : false;
export class PullToRefresh {
  constructor() {
    this._ScreenY = 0;
    this._startScreenY = 0;
    this._lastScreenY = 0;
    this._isMounted = false;
    this.triggerPullDownRefresh = (flag) => {
      // 在初始化时、用代码 自动 触发 pullDownRefresh
      // 添加this._isMounted的判断，否则组建一实例化，currSt就会是finish
      if (!this.dragOnEdge && this._isMounted) {
        if (flag) {
          this._lastScreenY = this.distanceToRefresh + 1;
          // change dom need after setState
          this.currSt = 'release';
          this.setContentStyle(this._lastScreenY);
        }
        else {
          this.currSt = 'finish';
          this.reset();
        }
      }
    };
    this.init = () => {
      const ele = this.scrollContainer;
      const child = this.el.querySelector('.rmc-pull-to-refresh-content');
      this.el.appendChild = child === null || child === void 0 ? void 0 : child.appendChild.bind(child);
      this.el.insertBefore = child === null || child === void 0 ? void 0 : child.insertBefore.bind(child);
      this.el.replaceChild = child === null || child === void 0 ? void 0 : child.replaceChild.bind(child);
      this.el.removeChild = child === null || child === void 0 ? void 0 : child.removeChild.bind(child);
      this._to = {
        touchstart: this.onTouchStart.bind(this, ele),
        touchmove: this.onTouchMove.bind(this, ele),
        touchend: this.onTouchEnd.bind(this, ele),
        touchcancel: this.onTouchEnd.bind(this, ele)
      };
      Object.keys(this._to).forEach(key => {
        ele.addEventListener(key, this._to[key], willPreventDefault);
      });
    };
    this.destroy = () => {
      // fix 频繁切换页面，可能会导致 this._to 为空造成报错
      if (!this._to)
        return;
      const ele = this.scrollContainer;
      Object.keys(this._to).forEach(key => {
        ele.removeEventListener(key, this._to[key]);
      });
    };
    this.onTouchStart = (_, e) => {
      this._ScreenY = this._startScreenY = e.touches[0].screenY;
      // 一开始 refreshing 为 true 时 this._lastScreenY 有值
      this._lastScreenY = this._lastScreenY || 0;
    };
    this.isEdge = (ele) => {
      const container = this.scrollContainer;
      if (container && container === document.body) {
        // In chrome61 `document.body.scrollTop` is invalid
        const scrollNode = document.scrollingElement ? document.scrollingElement : document.body;
        return scrollNode.scrollTop <= 0;
      }
      return ele.scrollTop <= 0;
    };
    this.damp = (dy) => {
      if (Math.abs(this._lastScreenY) > this.damping) {
        return 0;
      }
      const ratio = Math.abs(this._ScreenY - this._startScreenY) / window.screen.height;
      dy *= (1 - ratio) * 0.6;
      return dy;
    };
    this.onTouchMove = (ele, e) => {
      // 使用 pageY 对比有问题
      const _screenY = e.touches[0].screenY;
      // 拖动方向不符合的不处理
      if (this._startScreenY > _screenY) {
        return;
      }
      if (this.isEdge(ele)) {
        if (!this.dragOnEdge) {
          // 当用户开始往上滑的时候isEdge还是false的话，会导致this._ScreenY不是想要的，只有当isEdge为true时，再上滑，才有意义
          // 下面这行代码解决了上面这个问题
          this._ScreenY = this._startScreenY = e.touches[0].screenY;
          this.dragOnEdge = true;
        }
        if (e.cancelable) {
          e.preventDefault();
        }
        // add stopPropagation with fastclick will trigger content onClick event. why?
        // ref https://github.com/ant-design/ant-design-mobile/issues/2141
        // e.stopPropagation();
        const _diff = Math.round(_screenY - this._ScreenY);
        this._ScreenY = _screenY;
        this._lastScreenY += this.damp(_diff);
        this.setContentStyle(this._lastScreenY);
        if (Math.abs(this._lastScreenY) < this.distanceToRefresh) {
          if (this.currSt !== 'deactivate') {
            // console.log('back to the distance');
            this.currSt = 'deactivate';
          }
        }
        else {
          if (this.currSt === 'deactivate') {
            // console.log('reach to the distance');
            this.currSt = 'activate';
          }
        }
        // https://github.com/ant-design/ant-design-mobile/issues/573#issuecomment-339560829
        // iOS UIWebView issue, It seems no problem in WKWebView
        if (isWebView && e.changedTouches[0].clientY < 0) {
          this.onTouchEnd();
        }
      }
    };
    this.onTouchEnd = () => {
      if (this.dragOnEdge) {
        this.dragOnEdge = false;
      }
      if (this.currSt === 'activate') {
        this.currSt = 'release';
        this.onRefresh.emit(this);
        this._lastScreenY = this.distanceToRefresh + 1;
        this.setContentStyle(this._lastScreenY);
      }
      else if (this.currSt === 'release') {
        this._lastScreenY = this.distanceToRefresh + 1;
        this.setContentStyle(this._lastScreenY);
      }
      else {
        this.reset();
      }
    };
    this.reset = () => {
      this._lastScreenY = 0;
      this.setContentStyle(0);
    };
    this.setContentStyle = (ty) => {
      // TODO: Why sometimes do not have `this.contentRef` ?
      if (this.contentRef) {
        // translate3d 不清理 会影响内部元素 定位
        if (ty) {
          setTransform(this.contentRef.style, `translate3d(0px,${ty}px,0)`);
        }
        else {
          setTransform(this.contentRef.style, '');
        }
      }
    };
    this.prefixCls = 'rmc-pull-to-refresh';
    this.distanceToRefresh = 50;
    this.damping = 100;
    this.indicator = INDICATOR;
    this.currSt = 'deactivate';
    this.dragOnEdge = false;
  }
  get scrollContainer() {
    return this.el.parentElement ||
      this.el.closest('.taro_page_stationed') ||
      document.querySelector('.taro_page_stationed') ||
      document.querySelector('.taro_page') ||
      document.querySelector('.taro_router') ||
      document.querySelector('.taro-tabbar__panel') ||
      document.body;
  }
  statusChange() {
    var _a, _b, _c, _d;
    const pageEl = this.scrollContainer;
    switch (this.currSt) {
      case 'release':
        (_b = (_a = pageEl === null || pageEl === void 0 ? void 0 : pageEl.__page) === null || _a === void 0 ? void 0 : _a.onPullDownRefresh) === null || _b === void 0 ? void 0 : _b.call(_a);
        break;
      case 'deactivate':
        (_d = (_c = pageEl === null || pageEl === void 0 ? void 0 : pageEl.__page) === null || _c === void 0 ? void 0 : _c.onPullIntercept) === null || _d === void 0 ? void 0 : _d.call(_c);
    }
  }
  disconnectedCallback() {
    this.destroy();
  }
  componentDidLoad() {
    this.init();
    this._isMounted = true;
    Taro.eventCenter.on('__taroStartPullDownRefresh', ({ successHandler, errorHandler }) => {
      try {
        this.triggerPullDownRefresh(true);
        successHandler({
          errMsg: 'startPullDownRefresh: ok'
        });
      }
      catch (e) {
        errorHandler({
          errMsg: 'startPullDownRefresh: fail'
        });
      }
    });
    Taro.eventCenter.on('__taroStopPullDownRefresh', ({ successHandler, errorHandler }) => {
      setTimeout(() => {
        try {
          this.triggerPullDownRefresh(false);
          successHandler({
            errMsg: 'stopPullDownRefresh: ok'
          });
        }
        catch (e) {
          errorHandler({
            errMsg: 'stopPullDownRefresh: fail'
          });
        }
      }, 0);
    });
  }
  render() {
    const renderRefresh = (cls) => {
      const { currSt, dragOnEdge, prefixCls } = this;
      const cla = classNames(cls, !dragOnEdge && `${prefixCls}-transition`);
      const showIndicator = currSt === 'activate' || currSt === 'release';
      return (h("div", { class: `${prefixCls}-content-wrapper` }, h("div", { class: cla, ref: el => {
          this.contentRef = el;
        } }, showIndicator && (h("div", { class: `${prefixCls}-indicator` }, h("div", null), h("div", null), h("div", null))), h("slot", null))));
    };
    if (this.scrollContainer) {
      return renderRefresh(`${this.prefixCls}-content ${this.prefixCls}-down`);
    }
    return (h(Host, { class: classNames(this.prefixCls, `${this.prefixCls}-down`) }, renderRefresh(`${this.prefixCls}-content`)));
  }
  static get is() { return "taro-pull-to-refresh-core"; }
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
      "prefixCls": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "prefix-cls",
        "reflect": false,
        "defaultValue": "'rmc-pull-to-refresh'"
      },
      "distanceToRefresh": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "distance-to-refresh",
        "reflect": false,
        "defaultValue": "50"
      },
      "damping": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "damping",
        "reflect": false,
        "defaultValue": "100"
      },
      "indicator": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "{ activate: string; deactivate: string; release: string; finish: string; }",
          "resolved": "{ activate: string; deactivate: string; release: string; finish: string; }",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "INDICATOR"
      }
    };
  }
  static get states() {
    return {
      "currSt": {},
      "dragOnEdge": {}
    };
  }
  static get events() {
    return [{
        "method": "onRefresh",
        "name": "refresh",
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
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "currSt",
        "methodName": "statusChange"
      }];
  }
}
