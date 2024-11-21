import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { i as isElement } from './index3.js';

const areaCss = "taro-movable-area-core{width:10px;height:10px;display:block;position:relative}";

const MovableArea = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    /** 子元素集合 */
    this.views = [];
    /** 手势缩放 */
    this.scaleLength = 0;
    this.viewsChanged = () => {
      this.views = [];
      const elements = this.element.querySelectorAll('taro-movable-view-core');
      Array.from(elements).forEach((element) => {
        this.views.push(element);
      });
      this.updateArea();
    };
    this.handleTouchStart = (e) => {
      const touches = e.touches;
      if (!touches || touches.length <= 1) {
        return;
      }
      const gap = {
        width: touches[1].pageX - touches[0].pageX,
        height: touches[1].pageY - touches[0].pageY
      };
      this.scaleLength = Math.sqrt(gap.width * gap.width + gap.height * gap.height);
      if (this.scaleArea) {
        return;
      }
      const find = (target, views) => {
        const loop = (e, t) => {
          if (!(e = e.parentNode)) {
            return false;
          }
          return (!isElement(e) || e !== document.body) && (e === t || e === t.element || e.element === t || loop(e, t));
        };
        for (let i = 0; i < views.length; i++) {
          const view = views[i];
          if (target === view["element"] || loop(target, view)) {
            return view;
          }
        }
      };
      const touch1 = find(touches[0].target, this.views);
      const touch2 = find(touches[1].target, this.views);
      this.scaleTarget = touch1 && touch1 === touch2 ? touch1 : undefined;
    };
    this.handleTouchMove = (e) => {
      const touches = e.touches;
      if (!touches || touches.length <= 1) {
        return;
      }
      e.preventDefault();
      const gap = {
        width: touches[1].pageX - touches[0].pageX,
        height: touches[1].pageY - touches[0].pageY
      };
      if (this.scaleLength > 0) {
        this.updateScale(Math.sqrt(gap.width * gap.width + gap.height * gap.height) / this.scaleLength);
      }
    };
    this.handleTouchEnd = (e) => {
      var _a, _b;
      if ((e.touches && e.touches.length) || !e.changedTouches) {
        return;
      }
      this.scaleLength = 0;
      if (this.scaleArea) {
        this.views.forEach((element) => {
          var _a;
          (_a = element["endScale"]) === null || _a === void 0 ? void 0 : _a.call(element);
        });
      }
      else {
        (_b = (_a = this.scaleTarget) === null || _a === void 0 ? void 0 : _a["endScale"]) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
      this.scaleTarget = undefined;
    };
    this.updateScale = (scale) => {
      var _a, _b;
      if (!scale || scale === 1) {
        return;
      }
      if (this.scaleArea) {
        this.views.forEach((element) => {
          var _a;
          (_a = element["setScale"]) === null || _a === void 0 ? void 0 : _a.call(element, scale);
        });
      }
      else {
        (_b = (_a = this.scaleTarget) === null || _a === void 0 ? void 0 : _a["setScale"]) === null || _b === void 0 ? void 0 : _b.call(_a, scale);
      }
    };
    this.updateArea = () => {
      const computedStyle = window.getComputedStyle(this.element);
      const clientRect = this.element.getBoundingClientRect();
      const horizontal = ["Left", "Right"].map((e) => {
        return parseFloat(computedStyle["border" + e + "Width"]) + parseFloat(computedStyle["padding" + e]);
      });
      const vertical = ["Top", "Bottom"].map((e) => {
        return parseFloat(computedStyle["border" + e + "Width"]) + parseFloat(computedStyle["padding" + e]);
      });
      this.views.forEach((element) => {
        var _a;
        (_a = element["setParent"]) === null || _a === void 0 ? void 0 : _a.call(element, {
          element: this.element,
          area: {
            height: clientRect.height - vertical[0] - vertical[1],
            width: clientRect.width - horizontal[0] - horizontal[1]
          }
        });
      });
    };
    this.scaleArea = undefined;
  }
  connectedCallback() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        var _a, _b;
        if (mutation.attributeName === "class" || mutation.attributeName === "style") {
          const offsetWidth = this.element.offsetWidth;
          const offsetHeight = this.element.offsetHeight;
          if (offsetWidth !== ((_a = this.offset) === null || _a === void 0 ? void 0 : _a.width) || offsetHeight !== ((_b = this.offset) === null || _b === void 0 ? void 0 : _b.height)) {
            this.updateArea();
          }
          this.offset = {
            width: offsetWidth,
            height: offsetHeight
          };
        }
      });
    });
    this.observer.observe(this.element, {
      attributes: true
    });
  }
  disconnectedCallback() {
    var _a;
    (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  componentDidLoad() {
    this.viewsChanged();
  }
  render() {
    return (h(Host, { onTouchStart: this.handleTouchStart, onTouchMove: this.handleTouchMove, onTouchEnd: this.handleTouchEnd }));
  }
  get element() { return this; }
  static get style() { return areaCss; }
}, [0, "taro-movable-area-core", {
    "scaleArea": [4, "scale-area"]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-movable-area-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-movable-area-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, MovableArea);
      }
      break;
  } });
}

const TaroMovableAreaCore = MovableArea;
const defineCustomElement = defineCustomElement$1;

export { TaroMovableAreaCore, defineCustomElement };
