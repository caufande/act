import { h, Host } from '@stencil/core';
import { isElement } from '../../utils';
export class MovableArea {
  constructor() {
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
  static get is() { return "taro-movable-area-core"; }
  static get originalStyleUrls() {
    return {
      "$": ["./area.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["area.css"]
    };
  }
  static get properties() {
    return {
      "scaleArea": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u5F53\u91CC\u9762\u7684 movable-view \u8BBE\u7F6E\u4E3A\u652F\u6301\u53CC\u6307\u7F29\u653E\u65F6\uFF0C\u8BBE\u7F6E\u6B64\u503C\u53EF\u5C06\u7F29\u653E\u624B\u52BF\u751F\u6548\u533A\u57DF\u4FEE\u6539\u4E3A\u6574\u4E2Amovable-area"
        },
        "attribute": "scale-area",
        "reflect": false
      }
    };
  }
  static get elementRef() { return "element"; }
}
