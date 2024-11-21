import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import Taro from '@tarojs/taro';
import { c as classnames } from './index2.js';

const indexCss = ".navigator-hover{background:#efefef}";

const Navigator = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onSuccess = createEvent(this, "cuccess", 7);
    this.onFail = createEvent(this, "fail", 7);
    this.onComplete = createEvent(this, "complete", 7);
    this.hoverClass = undefined;
    this.url = undefined;
    this.openType = 'navigate';
    this.isHover = false;
    this.delta = 0;
  }
  onClick() {
    const { openType, onSuccess, onFail, onComplete } = this;
    let promise = Promise.resolve();
    switch (openType) {
      case 'navigate':
        promise = Taro.navigateTo({
          url: this.url
        });
        break;
      case 'redirect':
        promise = Taro.redirectTo({
          url: this.url
        });
        break;
      case 'switchTab':
        promise = Taro.switchTab({
          url: this.url
        });
        break;
      case 'reLaunch':
        promise = Taro.reLaunch({
          url: this.url
        });
        break;
      case 'navigateBack':
        promise = Taro.navigateBack({
          delta: this.delta
        });
        break;
      case 'exit':
        promise = Promise.reject(new Error('navigator:fail 暂不支持"openType: exit"'));
        break;
    }
    if (promise) {
      promise.then(res => {
        onSuccess.emit(res);
      }).catch(res => {
        onFail.emit(res);
      }).finally(() => {
        onComplete.emit();
      });
    }
  }
  render() {
    const { isHover, hoverClass } = this;
    return (h(Host, { class: classnames({
        [hoverClass]: isHover
      }) }));
  }
  static get style() { return indexCss; }
}, [0, "taro-navigator-core", {
    "hoverClass": [1, "hover-class"],
    "url": [1],
    "openType": [1, "open-type"],
    "isHover": [4, "is-hover"],
    "delta": [2]
  }, [[0, "click", "onClick"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-navigator-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-navigator-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Navigator);
      }
      break;
  } });
}

const TaroNavigatorCore = Navigator;
const defineCustomElement = defineCustomElement$1;

export { TaroNavigatorCore, defineCustomElement };
