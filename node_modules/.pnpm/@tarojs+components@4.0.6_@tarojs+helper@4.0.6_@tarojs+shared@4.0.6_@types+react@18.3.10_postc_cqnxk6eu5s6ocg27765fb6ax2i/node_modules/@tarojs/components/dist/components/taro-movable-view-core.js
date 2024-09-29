import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';

const viewCss = "taro-movable-view-core{width:10px;height:10px;display:inline-block;position:absolute;top:0;left:0}";

const MovableView = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onChange = createEvent(this, "change", 7);
    this.onScale = createEvent(this, "scale", 7);
    this.onHTouchMove = createEvent(this, "htouchmove", 7);
    this.onVTouchMove = createEvent(this, "vtouchmove", 7);
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
  get element() { return this; }
  static get watchers() { return {
    "x": ["watchX"],
    "y": ["watchY"],
    "scaleMin": ["watchScaleMinOrMax"],
    "scaleMax": ["watchScaleMinOrMax"],
    "scaleValue": ["watchScaleValue"]
  }; }
  static get style() { return viewCss; }
}, [0, "taro-movable-view-core", {
    "x": [8],
    "y": [8],
    "direction": [1],
    "outOfBounds": [4, "out-of-bounds"],
    "inertia": [4],
    "friction": [2],
    "damping": [2],
    "disabled": [4],
    "scale": [4],
    "scaleMin": [2, "scale-min"],
    "scaleMax": [2, "scale-max"],
    "scaleValue": [2, "scale-value"],
    "animation": [4],
    "setParent": [64],
    "endScale": [64],
    "setScale": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-movable-view-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-movable-view-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, MovableView);
      }
      break;
  } });
}

const TaroMovableViewCore = MovableView;
const defineCustomElement = defineCustomElement$1;

export { TaroMovableViewCore, defineCustomElement };
