import { Host, h } from '@stencil/core';
import classNames from 'classnames';
import { debounce, handleStencilNodes } from '../../utils';
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
export class ScrollView {
  constructor() {
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
    const cls = classNames({
      'taro-scroll-view__scroll-x': scrollX,
      'taro-scroll-view__scroll-y': scrollY
    });
    return (h(Host, { class: cls }, h("slot", null)));
  }
  static get is() { return "taro-scroll-view-core"; }
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
      "scrollX": {
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
          "text": ""
        },
        "attribute": "scroll-x",
        "reflect": false,
        "defaultValue": "false"
      },
      "scrollY": {
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
          "text": ""
        },
        "attribute": "scroll-y",
        "reflect": false,
        "defaultValue": "false"
      },
      "upperThreshold": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "number | string",
          "resolved": "number | string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "upper-threshold",
        "reflect": false,
        "defaultValue": "50"
      },
      "lowerThreshold": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "number | string",
          "resolved": "number | string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "lower-threshold",
        "reflect": false,
        "defaultValue": "50"
      },
      "mpScrollTop": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "number | string",
          "resolved": "number | string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "scroll-top",
        "reflect": true
      },
      "mpScrollLeft": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "number | string",
          "resolved": "number | string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "scroll-left",
        "reflect": true
      },
      "mpScrollIntoView": {
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
        "attribute": "scroll-into-view",
        "reflect": true
      },
      "mpScrollIntoViewAlignment": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'start' | 'center' | 'end' | 'nearest'",
          "resolved": "\"center\" | \"end\" | \"nearest\" | \"start\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "scroll-into-view-alignment",
        "reflect": false
      },
      "animated": {
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
          "text": ""
        },
        "attribute": "scroll-with-animation",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get events() {
    return [{
        "method": "onScroll",
        "name": "scroll",
        "bubbles": false,
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
      }, {
        "method": "onScrollToUpper",
        "name": "scrolltoupper",
        "bubbles": false,
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
      }, {
        "method": "onScrollToLower",
        "name": "scrolltolower",
        "bubbles": false,
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
  static get methods() {
    return {
      "mpScrollToMethod": {
        "complexType": {
          "signature": "(object: ScrollViewContext.scrollTo.Option) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            },
            "ScrollViewContext": {
              "location": "import",
              "path": "@tarojs/taro"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "mpScrollIntoViewMethod": {
        "complexType": {
          "signature": "(selector: string) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "mpScrollLeft",
        "methodName": "watchScrollLeft"
      }, {
        "propName": "mpScrollTop",
        "methodName": "watchScrollTop"
      }, {
        "propName": "mpScrollIntoView",
        "methodName": "watchScrollIntoView"
      }];
  }
  static get listeners() {
    return [{
        "name": "scroll",
        "method": "handleScroll",
        "target": undefined,
        "capture": false,
        "passive": true
      }, {
        "name": "touchmove",
        "method": "handleTouchMove",
        "target": undefined,
        "capture": false,
        "passive": true
      }];
  }
}
