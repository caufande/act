import { h, Host } from '@stencil/core';
export class MovableView {
  constructor() {
    /** 当前水平偏移 */
    this.translateX = 0;
    /** 当前垂直偏移 */
    this.translateY = 0;
    /** touch-start 原点 */
    this.origin = { x: 0, y: 0 };
    /** 父容器大小 */
    this.area = { width: 0, height: 0 };
    /** 原始缩放倍数 */
    this.originScale = 1;
    /** 当前缩放倍数 */
    this.currentScale = 1;
    /** 宽度 */
    this.width = 0;
    /** 高度 */
    this.height = 0;
    /** 移动边界 */
    this.minX = 0;
    this.minY = 0;
    this.maxX = 0;
    this.maxY = 0;
    /** 移动基础位置 */
    this.baseX = 0;
    this.baseY = 0;
    /** 偏移量 */
    this.offset = { x: 0, y: 0 };
    this.scaleOffset = { x: 0, y: 0 };
    this.getLimitXY = (x, y) => {
      let outOfBounds = false;
      x > this.maxX ? (x = this.maxX, outOfBounds = true) : x < this.minX && (x = this.minX, outOfBounds = true);
      y > this.maxY ? (y = this.maxY, outOfBounds = true) : y < this.minY && (y = this.minY, outOfBounds = true);
      return { x, y, outOfBounds };
    };
    this.animationTo = (x, y, scale, source, noEmitChange, emitScale, callback) => {
      if (this.animation) {
        this.setTransform(x, y, scale, source, noEmitChange, emitScale);
        callback === null || callback === void 0 ? void 0 : callback();
      }
      else {
        this.setTransform(x, y, scale, source, noEmitChange, emitScale);
      }
    };
    this.setTransform = (x, y, scale, source, noEmitChange, emitScale) => {
      x = Number(x.toFixed(1));
      y = Number(y.toFixed(1));
      scale = Number((scale !== null && scale !== void 0 ? scale : this.currentScale).toFixed(3));
      if (!this.outOfBounds) {
        const limit = this.getLimitXY(x, y);
        x = limit.x;
        y = limit.y;
      }
      const subtract = (e, t) => {
        return +((1e3 * e - 1e3 * t) / 1e3).toFixed(1);
      };
      const realX = subtract(x, this.scaleOffset.x);
      const realY = subtract(y, this.scaleOffset.y);
      if (this.translateX !== x || this.translateY !== y) {
        !noEmitChange && this.onChange.emit({
          x: realX,
          y: realY,
          source
        });
      }
      if (scale !== this.currentScale) {
        emitScale && this.onScale.emit({
          scale,
          x: realX,
          y: realY
        });
      }
      const transform = `translateX(${x}px) translateY(${y}px) translateZ(0px) scale(${scale})`;
      this.element.style.transform = transform;
      this.element.style.webkitTransform = transform;
      this.translateX = x;
      this.translateY = y;
      this.currentScale = scale;
    };
    this.updateOffset = () => {
      const offset = (element, parent) => {
        if (element === parent || !element.offsetParent) {
          return { left: 0, top: 0 };
        }
        const current = offset(element.offsetParent, parent);
        return {
          left: element.offsetLeft + current.left,
          top: element.offsetTop + current.top
        };
      };
      if (!this.parent) {
        return;
      }
      const current = offset(this.element, this.parent);
      this.offset.x = current.left;
      this.offset.y = current.top;
    };
    this.updateScaleOffset = (scale = this.currentScale) => {
      const rect = this.element.getBoundingClientRect();
      this.height = rect.height / this.currentScale;
      this.width = rect.width / this.currentScale;
      this.scaleOffset.x = (this.width * scale - this.width) / 2;
      this.scaleOffset.y = (this.height * scale - this.height) / 2;
    };
    this.updateBoundary = () => {
      const x1 = 0 - this.offset.x + this.scaleOffset.x;
      const x2 = this.area.width - this.width - this.offset.x - this.scaleOffset.x;
      this.minX = Math.min(x1, x2);
      this.maxX = Math.max(x1, x2);
      const y1 = 0 - this.offset.y + this.scaleOffset.y;
      const y2 = this.area.height - this.height - this.offset.y - this.scaleOffset.y;
      this.minY = Math.min(y1, y2);
      this.maxY = Math.max(y1, y2);
    };
    this.updateScale = (scale, animation, animationCallback) => {
      if (!this.scale) {
        return;
      }
      const target = this.adjustScale(scale);
      this.updateScaleOffset(target);
      this.updateBoundary();
      const { x, y } = this.getLimitXY(this.translateX, this.translateY);
      if (animation) {
        this.animationTo(x, y, target, "", true, true, animationCallback);
      }
      else if (!this.updating) {
        this.updating = true;
        requestAnimationFrame(() => {
          this.setTransform(x, y, target, "", true, true);
          this.updating = false;
        });
      }
    };
    this.setOriginScale = (scale) => {
      this.originScale = scale;
    };
    this.adjustScale = (scale) => {
      return Math.min(10, this.scaleMax, Math.max(.5, this.scaleMin, scale));
    };
    this.handleTouchStart = (e) => {
      const touches = e.touches;
      if (this.disabled || touches.length > 1 || !this.element) {
        return;
      }
      const touch = touches[0];
      this.touching = true;
      this.firstMoveFireEvent = false;
      this.origin.x = touch.screenX;
      this.origin.y = touch.screenY;
      this.baseX = this.translateX;
      this.baseY = this.translateY;
      this.element.style.willChange = "transform";
    };
    this.handleTouchMove = (e) => {
      const touches = e.touches;
      if (this.disabled || !this.element || this.scaling || !this.touching || touches.length > 1) {
        return;
      }
      if (this.direction !== "horizontal") {
        e.preventDefault();
      }
      const touch = touches[0];
      const x = touch.screenX - this.origin.x;
      const y = touch.screenY - this.origin.y;
      this.setTransform(this.xMove ? (x + this.baseX) : 0, this.yMove ? (y + this.baseY) : 0);
      if (!this.firstMoveFireEvent) {
        this.firstMoveFireEvent = true;
        const onTouchMove = Math.abs(x) > Math.abs(y) ? this.onHTouchMove : this.onVTouchMove;
        onTouchMove.emit({
          originalEvent: e,
          bubbles: false,
          capturePhase: false,
          composed: true,
          extraFields: {
            touches: e.touches || {},
            changedTouches: e.changedTouches || {}
          }
        });
      }
    };
    this.handleTouchEnd = (e) => {
      const touch = e.changedTouches[0];
      if (this.disabled || !this.touching || !touch) {
        return;
      }
      this.touching = false;
      const x = touch.screenX - this.origin.x;
      const y = touch.screenY - this.origin.y;
      this.setTransform(this.xMove ? (x + this.baseX) : 0, this.yMove ? (y + this.baseY) : 0);
    };
    this.x = 0;
    this.y = 0;
    this.direction = "none";
    this.outOfBounds = false;
    this.inertia = false;
    this.friction = 2;
    this.damping = 20;
    this.disabled = false;
    this.scale = false;
    this.scaleMin = .5;
    this.scaleMax = 10;
    this.scaleValue = 1;
    this.animation = true;
  }
  watchX(newValue) {
    this.setTransform(parseFloat(`${newValue || 0}`), this.translateY);
  }
  watchY(newValue) {
    this.setTransform(this.translateX, parseFloat(`${newValue || 0}`));
  }
  watchScaleMinOrMax() {
    if (!this.scale)
      return false;
    this.updateScale(this.currentScale, true);
    this.setOriginScale(this.currentScale);
  }
  watchScaleValue(scale) {
    if (!this.scale) {
      return false;
    }
    this.updateScale(scale, true);
    this.setOriginScale(scale);
    return scale;
  }
  /**
   * 设置父节点
   */
  async setParent({ element, area }) {
    const scale = this.scale ? this.scaleValue : 1;
    this.area = area;
    this.parent = element;
    this.updateOffset();
    this.updateScaleOffset(scale);
    this.updateBoundary();
    this.setTransform(Number(this.x) + this.scaleOffset.x, Number(this.y) + this.scaleOffset.y, scale, "", true);
    this.setOriginScale(scale);
  }
  /**
   * 结束缩放
   */
  async endScale() {
    this.scaling = false;
    this.setOriginScale(this.currentScale);
  }
  /**
   * 更新缩放
   */
  async setScale(scale) {
    if (!this.scale) {
      return;
    }
    this.scaling = true;
    this.updateScale(scale * this.originScale);
  }
  connectedCallback() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const name = mutation.attributeName;
        if (name && ["class", "style"].includes(name)) {
          const oldValue = mutation.oldValue;
          const newValue = mutation.target.getAttribute(name);
          if (oldValue === newValue) {
            return;
          }
          const filter = (input) => {
            return input === null || input === void 0 ? void 0 : input.split(";").filter((item) => {
              return !["transform", "will-change"].find((key) => {
                return item.trim().startsWith(key);
              });
            }).join(";");
          };
          if (name === "style" && filter(newValue) === filter(oldValue)) {
            return;
          }
          this.updateOffset();
          this.updateScaleOffset();
          this.updateBoundary();
          this.setTransform(this.translateX, this.translateY);
        }
      });
    });
    this.observer.observe(this.element, {
      attributes: true,
      attributeOldValue: true
    });
  }
  disconnectedCallback() {
    var _a;
    (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  componentDidLoad() {
    this.element.style.transformOrigin = "center";
    this.xMove = ["horizontal", "all"].includes(this.direction);
    this.yMove = ["vertical", "all"].includes(this.direction);
    if (this.friction <= 0) {
      this.friction = 2;
    }
    if (this.x || this.y) {
      const x = parseFloat(`${this.x || 0}`);
      const y = parseFloat(`${this.y || 0}`);
      this.setTransform(x, y);
    }
  }
  render() {
    return (h(Host, { onTouchStart: this.handleTouchStart, onTouchMove: this.handleTouchMove, onTouchEnd: this.handleTouchEnd }));
  }
  static get is() { return "taro-movable-view-core"; }
  static get originalStyleUrls() {
    return {
      "$": ["./view.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["view.css"]
    };
  }
  static get properties() {
    return {
      "x": {
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
          "text": "\u5B9A\u4E49x\u8F74\u65B9\u5411\u7684\u504F\u79FB\uFF0C\u5982\u679Cx\u7684\u503C\u4E0D\u5728\u53EF\u79FB\u52A8\u8303\u56F4\u5185\uFF0C\u4F1A\u81EA\u52A8\u79FB\u52A8\u5230\u53EF\u79FB\u52A8\u8303\u56F4\uFF1B\u6539\u53D8x\u7684\u503C\u4F1A\u89E6\u53D1\u52A8\u753B\uFF1B\u5355\u4F4D\u652F\u6301px\uFF1B"
        },
        "attribute": "x",
        "reflect": false,
        "defaultValue": "0"
      },
      "y": {
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
          "text": "\u5B9A\u4E49y\u8F74\u65B9\u5411\u7684\u504F\u79FB\uFF0C\u5982\u679Cy\u7684\u503C\u4E0D\u5728\u53EF\u79FB\u52A8\u8303\u56F4\u5185\uFF0C\u4F1A\u81EA\u52A8\u79FB\u52A8\u5230\u53EF\u79FB\u52A8\u8303\u56F4\uFF1B\u6539\u53D8y\u7684\u503C\u4F1A\u89E6\u53D1\u52A8\u753B\uFF1B\u5355\u4F4D\u652F\u6301px\uFF1B"
        },
        "attribute": "y",
        "reflect": false,
        "defaultValue": "0"
      },
      "direction": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "\"all\" | \"vertical\" | \"horizontal\" | \"none\"",
          "resolved": "\"all\" | \"horizontal\" | \"none\" | \"vertical\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "\u79FB\u52A8\u65B9\u5411\uFF0C\u5C5E\u6027\u503C\u6709all\u3001vertical\u3001horizontal\u3001none"
        },
        "attribute": "direction",
        "reflect": false,
        "defaultValue": "\"none\""
      },
      "outOfBounds": {
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
          "text": "\u8D85\u8FC7\u53EF\u79FB\u52A8\u533A\u57DF\u540E\uFF0C\u662F\u5426\u8FD8\u53EF\u4EE5\u79FB\u52A8"
        },
        "attribute": "out-of-bounds",
        "reflect": false,
        "defaultValue": "false"
      },
      "inertia": {
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
          "text": "\u662F\u5426\u5E26\u6709\u60EF\u6027"
        },
        "attribute": "inertia",
        "reflect": false,
        "defaultValue": "false"
      },
      "friction": {
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
          "text": "\u6469\u64E6\u7CFB\u6570\uFF0C\u7528\u4E8E\u63A7\u5236\u60EF\u6027\u6ED1\u52A8\u7684\u52A8\u753B\uFF0C\u503C\u8D8A\u5927\u6469\u64E6\u529B\u8D8A\u5927\uFF0C\u6ED1\u52A8\u8D8A\u5FEB\u505C\u6B62\uFF1B\u5FC5\u987B\u5927\u4E8E0\uFF0C\u5426\u5219\u4F1A\u88AB\u8BBE\u7F6E\u6210\u9ED8\u8BA4\u503C"
        },
        "attribute": "friction",
        "reflect": false,
        "defaultValue": "2"
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
          "text": "\u963B\u5C3C\u7CFB\u6570\uFF0C\u7528\u4E8E\u63A7\u5236x\u6216y\u6539\u53D8\u65F6\u7684\u52A8\u753B\u548C\u8FC7\u754C\u56DE\u5F39\u7684\u52A8\u753B\uFF0C\u503C\u8D8A\u5927\u79FB\u52A8\u8D8A\u5FEB"
        },
        "attribute": "damping",
        "reflect": false,
        "defaultValue": "20"
      },
      "disabled": {
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
          "text": "\u662F\u5426\u7981\u7528"
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "scale": {
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
          "text": "\u662F\u5426\u652F\u6301\u53CC\u6307\u7F29\u653E\uFF0C\u9ED8\u8BA4\u7F29\u653E\u624B\u52BF\u751F\u6548\u533A\u57DF\u662F\u5728movable-view\u5185"
        },
        "attribute": "scale",
        "reflect": false,
        "defaultValue": "false"
      },
      "scaleMin": {
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
          "text": "\u5B9A\u4E49\u7F29\u653E\u500D\u6570\u6700\u5C0F\u503C"
        },
        "attribute": "scale-min",
        "reflect": false,
        "defaultValue": ".5"
      },
      "scaleMax": {
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
          "text": "\u5B9A\u4E49\u7F29\u653E\u500D\u6570\u6700\u5927\u503C"
        },
        "attribute": "scale-max",
        "reflect": false,
        "defaultValue": "10"
      },
      "scaleValue": {
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
          "text": "\u5B9A\u4E49\u7F29\u653E\u500D\u6570\uFF0C\u53D6\u503C\u8303\u56F4\u4E3A 0.5 - 10"
        },
        "attribute": "scale-value",
        "reflect": false,
        "defaultValue": "1"
      },
      "animation": {
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
          "text": "\u662F\u5426\u4F7F\u7528\u52A8\u753B"
        },
        "attribute": "animation",
        "reflect": false,
        "defaultValue": "true"
      }
    };
  }
  static get events() {
    return [{
        "method": "onChange",
        "name": "change",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "\u62D6\u52A8\u8FC7\u7A0B\u4E2D\u89E6\u53D1\u7684\u4E8B\u4EF6\uFF0Cevent.detail = {x, y, source}"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "onScale",
        "name": "scale",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "\u7F29\u653E\u8FC7\u7A0B\u4E2D\u89E6\u53D1\u7684\u4E8B\u4EF6\uFF0Cevent.detail = {x, y, scale}\uFF0Cx\u548Cy\u5B57\u6BB5\u57282.1.0\u4E4B\u540E\u652F\u6301"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "onHTouchMove",
        "name": "htouchmove",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "\u521D\u6B21\u624B\u6307\u89E6\u6478\u540E\u79FB\u52A8\u4E3A\u6A2A\u5411\u7684\u79FB\u52A8\u65F6\u89E6\u53D1\uFF0C\u5982\u679Ccatch\u6B64\u4E8B\u4EF6\uFF0C\u5219\u610F\u5473\u7740touchmove\u4E8B\u4EF6\u4E5F\u88ABcatch"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "onVTouchMove",
        "name": "vtouchmove",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "\u521D\u6B21\u624B\u6307\u89E6\u6478\u540E\u79FB\u52A8\u4E3A\u7EB5\u5411\u7684\u79FB\u52A8\u65F6\u89E6\u53D1\uFF0C\u5982\u679Ccatch\u6B64\u4E8B\u4EF6\uFF0C\u5219\u610F\u5473\u7740touchmove\u4E8B\u4EF6\u4E5F\u88ABcatch"
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
      "setParent": {
        "complexType": {
          "signature": "({ element, area }: { element: HTMLElement; area: { width: number; height: number; }; }) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            },
            "HTMLElement": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "\u8BBE\u7F6E\u7236\u8282\u70B9",
          "tags": []
        }
      },
      "endScale": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "\u7ED3\u675F\u7F29\u653E",
          "tags": []
        }
      },
      "setScale": {
        "complexType": {
          "signature": "(scale: number) => Promise<void>",
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
          "text": "\u66F4\u65B0\u7F29\u653E",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "x",
        "methodName": "watchX"
      }, {
        "propName": "y",
        "methodName": "watchY"
      }, {
        "propName": "scaleMin",
        "methodName": "watchScaleMinOrMax"
      }, {
        "propName": "scaleMax",
        "methodName": "watchScaleMinOrMax"
      }, {
        "propName": "scaleValue",
        "methodName": "watchScaleValue"
      }];
  }
}
