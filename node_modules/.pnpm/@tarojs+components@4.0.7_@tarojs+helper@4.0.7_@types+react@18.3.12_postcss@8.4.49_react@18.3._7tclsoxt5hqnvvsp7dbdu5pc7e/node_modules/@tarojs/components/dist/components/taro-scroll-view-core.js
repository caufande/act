import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';
import { d as debounce } from './index3.js';
import { h as handleStencilNodes } from './helper.js';

const indexCss = "taro-scroll-view-core{-webkit-overflow-scrolling:auto;width:100%;display:block}taro-scroll-view-core::-webkit-scrollbar{display:none}.taro-scroll-view__scroll-x{overflow:scroll hidden}.taro-scroll-view__scroll-y{overflow:hidden scroll}";

function easeOutScroll(from, to, duration = 500, callback) {
  if (from === to || typeof from !== 'number') {
    return;
  }
  const change = to - from;
  const sTime = Date.now();
  const isLarger = to >= from;
  function linear(t, b, c, d) {
    return c * t / d + b;
  }
  function step() {
    from = linear(Date.now() - sTime, from, change, duration);
    if ((isLarger && from >= to) || (!isLarger && to >= from)) {
      callback(to);
      return;
    }
    callback(from);
    requestAnimationFrame(step);
  }
  step();
}
const ScrollView = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onScroll = createEvent(this, "scroll", 3);
    this.onScrollToUpper = createEvent(this, "scrolltoupper", 3);
    this.onScrollToLower = createEvent(this, "scrolltolower", 3);
    this._scrollLeft = 0;
    this._scrollTop = 0;
    this.upperAndLower = debounce(() => {
      const { offsetWidth, offsetHeight, scrollLeft, scrollTop, scrollHeight, scrollWidth } = this.el;
      const lowerThreshold = Number(this.lowerThreshold);
      const upperThreshold = Number(this.upperThreshold);
      if (!isNaN(lowerThreshold) &&
        ((this.scrollY && offsetHeight + scrollTop + lowerThreshold >= scrollHeight) ||
          (this.scrollX && offsetWidth + scrollLeft + lowerThreshold >= scrollWidth))) {
        this.onScrollToLower.emit({
          direction: this.scrollX ? 'right' : (this.scrollY ? 'bottom' : '')
        });
      }
      if (!isNaN(upperThreshold) &&
        ((this.scrollY && scrollTop <= upperThreshold) ||
          (this.scrollX && scrollLeft <= upperThreshold))) {
        this.onScrollToUpper.emit({
          direction: this.scrollX ? 'left' : (this.scrollY ? 'top' : '')
        });
      }
    }, 200);
    this.scrollX = false;
    this.scrollY = false;
    this.upperThreshold = 50;
    this.lowerThreshold = 50;
    this.mpScrollTop = undefined;
    this.mpScrollLeft = undefined;
    this.mpScrollIntoView = undefined;
    this.mpScrollIntoViewAlignment = undefined;
    this.animated = false;
  }
  watchScrollLeft(newVal) {
    const left = Number(newVal);
    const { animated } = this;
    this.mpScrollToMethod({
      left, animated
    });
  }
  watchScrollTop(newVal) {
    const top = Number(newVal);
    const { animated } = this;
    this.mpScrollToMethod({
      top, animated
    });
  }
  watchScrollIntoView(newVal) {
    this.mpScrollIntoViewMethod(newVal);
  }
  handleScroll(e) {
    var _a;
    if (e instanceof CustomEvent)
      return;
    e.stopPropagation();
    (_a = e.stopImmediatePropagation) === null || _a === void 0 ? void 0 : _a.call(e);
    const { scrollLeft, scrollTop, scrollHeight, scrollWidth } = this.el;
    this._scrollLeft = scrollLeft;
    this._scrollTop = scrollTop;
    this.upperAndLower();
    this.onScroll.emit({
      scrollLeft,
      scrollTop,
      scrollHeight,
      scrollWidth
    });
  }
  handleTouchMove(e) {
    if (e instanceof CustomEvent)
      return;
    e.stopPropagation();
  }
  async mpScrollToMethod(object) {
    let { top, left, duration, animated = false } = object;
    if (this.scrollY && typeof top === 'number' && !isNaN(top) && top !== this._scrollTop) {
      if (animated) {
        easeOutScroll(this._scrollTop, top, duration, pos => (this.el.scrollTop = pos));
      }
      else {
        this.el.scrollTop = top;
      }
      this._scrollTop = top;
    }
    if (this.scrollX && typeof left === 'number' && !isNaN(left) && left !== this._scrollLeft) {
      if (animated) {
        easeOutScroll(this._scrollLeft, left, duration, pos => (this.el.scrollLeft = pos));
      }
      else {
        this.el.scrollLeft = left;
      }
      this._scrollLeft = left;
    }
  }
  async mpScrollIntoViewMethod(selector) {
    var _a;
    if (typeof selector === 'string' && selector) {
      (_a = document.querySelector(`#${selector}`)) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
        behavior: this.animated ? 'smooth' : 'auto',
        block: this.scrollY ? (this.mpScrollIntoViewAlignment || 'center') : 'center',
        inline: this.scrollX ? (this.mpScrollIntoViewAlignment || 'start') : 'start'
      });
    }
  }
  componentDidLoad() {
    const top = Number(this.mpScrollTop);
    const left = Number(this.mpScrollLeft);
    const { animated } = this;
    this.mpScrollToMethod({
      top, left, animated
    });
  }
  componentDidRender() {
    handleStencilNodes(this.el);
  }
  render() {
    const { scrollX, scrollY } = this;
    const cls = classnames({
      'taro-scroll-view__scroll-x': scrollX,
      'taro-scroll-view__scroll-y': scrollY
    });
    return (h(Host, { class: cls }, h("slot", null)));
  }
  get el() { return this; }
  static get watchers() { return {
    "mpScrollLeft": ["watchScrollLeft"],
    "mpScrollTop": ["watchScrollTop"],
    "mpScrollIntoView": ["watchScrollIntoView"]
  }; }
  static get style() { return indexCss; }
}, [4, "taro-scroll-view-core", {
    "scrollX": [4, "scroll-x"],
    "scrollY": [4, "scroll-y"],
    "upperThreshold": [8, "upper-threshold"],
    "lowerThreshold": [8, "lower-threshold"],
    "mpScrollTop": [520, "scroll-top"],
    "mpScrollLeft": [520, "scroll-left"],
    "mpScrollIntoView": [513, "scroll-into-view"],
    "mpScrollIntoViewAlignment": [1, "scroll-into-view-alignment"],
    "animated": [4, "scroll-with-animation"],
    "mpScrollToMethod": [64],
    "mpScrollIntoViewMethod": [64]
  }, [[1, "scroll", "handleScroll"], [1, "touchmove", "handleTouchMove"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-scroll-view-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-scroll-view-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ScrollView);
      }
      break;
  } });
}

const TaroScrollViewCore = ScrollView;
const defineCustomElement = defineCustomElement$1;

export { TaroScrollViewCore, defineCustomElement };
