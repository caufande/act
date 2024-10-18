import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';

const coverViewCss = "taro-cover-view-core{display:block}";

const CoverView = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onLongPress = createEvent(this, "longpress", 7);
    this.startTime = 0;
    this.animation = undefined;
    this.hoverClass = undefined;
    this.hoverStartTime = 50;
    this.hoverStayTime = 400;
    this.hover = false;
    this.touch = false;
  }
  onTouchStart() {
    if (this.hoverClass) {
      this.touch = true;
      setTimeout(() => {
        if (this.touch) {
          this.hover = true;
        }
      }, this.hoverStartTime);
    }
    this.timeoutEvent = setTimeout(() => {
      this.onLongPress.emit();
    }, 350);
    this.startTime = Date.now();
  }
  onTouchMove() {
    clearTimeout(this.timeoutEvent);
  }
  onTouchEnd() {
    const spanTime = Date.now() - this.startTime;
    if (spanTime < 350) {
      clearTimeout(this.timeoutEvent);
    }
    if (this.hoverClass) {
      this.touch = false;
      setTimeout(() => {
        if (!this.touch) {
          this.hover = false;
        }
      }, this.hoverStayTime);
    }
  }
  render() {
    const cls = classnames({
      [`${this.hoverClass}`]: this.hover
    });
    let attr = {};
    if (!!this.animation) {
      attr['animation'] = this.animation;
      attr['data-animation'] = this.animation;
    }
    return (h(Host, Object.assign({ class: cls }, attr), h("slot", null)));
  }
  static get style() { return coverViewCss; }
}, [4, "taro-cover-view-core", {
    "animation": [1],
    "hoverClass": [1, "hover-class"],
    "hoverStartTime": [2, "hover-start-time"],
    "hoverStayTime": [2, "hover-stay-time"],
    "hover": [32],
    "touch": [32]
  }, [[1, "touchstart", "onTouchStart"], [1, "touchmove", "onTouchMove"], [1, "touchend", "onTouchEnd"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-cover-view-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-cover-view-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, CoverView);
      }
      break;
  } });
}

const TaroCoverViewCore = CoverView;
const defineCustomElement = defineCustomElement$1;

export { TaroCoverViewCore, defineCustomElement };
