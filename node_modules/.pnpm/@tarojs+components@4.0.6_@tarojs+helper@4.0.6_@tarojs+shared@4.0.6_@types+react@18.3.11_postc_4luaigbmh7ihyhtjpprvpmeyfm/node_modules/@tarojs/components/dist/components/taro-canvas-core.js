import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';

const indexCss = "taro-canvas-core{width:300px;height:150px;display:block;position:relative}";

const LONG_TAP_DELAY = 500;
const Canvas = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onLongTap = createEvent(this, "longtap", 7);
    this.onTouchStart = () => {
      this.timer = setTimeout(() => {
        this.onLongTap.emit();
      }, LONG_TAP_DELAY);
    };
    this.onTouchMove = () => {
      clearTimeout(this.timer);
    };
    this.onTouchEnd = () => {
      clearTimeout(this.timer);
    };
    this.canvasId = undefined;
    this.height = undefined;
    this.width = undefined;
    this.nativeProps = {};
  }
  componentDidRender() {
    const [canvas] = this.el.children;
    if (!this.height || !this.width) {
      let style = window.getComputedStyle(canvas);
      this.height || (this.height = style.height);
      this.width || (this.width = style.width);
    }
    canvas.height = parseInt(this.height);
    canvas.width = parseInt(this.width);
  }
  render() {
    const { canvasId, nativeProps } = this;
    return (h("canvas", Object.assign({ "canvas-id": canvasId, style: {
        width: '100%',
        height: '100%'
      }, onTouchStart: this.onTouchStart, onTouchMove: this.onTouchMove, onTouchCancel: this.onTouchEnd, onTouchEnd: this.onTouchEnd }, nativeProps)));
  }
  get el() { return this; }
  static get style() { return indexCss; }
}, [0, "taro-canvas-core", {
    "canvasId": [1, "id"],
    "height": [1537],
    "width": [1537],
    "nativeProps": [16]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-canvas-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-canvas-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Canvas);
      }
      break;
  } });
}

const TaroCanvasCore = Canvas;
const defineCustomElement = defineCustomElement$1;

export { TaroCanvasCore, defineCustomElement };
