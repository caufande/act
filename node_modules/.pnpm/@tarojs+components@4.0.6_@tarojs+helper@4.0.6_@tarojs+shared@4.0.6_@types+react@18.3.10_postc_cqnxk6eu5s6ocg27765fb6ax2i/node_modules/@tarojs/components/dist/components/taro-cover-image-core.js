import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';

const indexCss = "taro-cover-image-core{width:320px;height:240px;overflow:hidden}";

const CoverImage = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onLoad = createEvent(this, "load", 7);
    this.onError = createEvent(this, "error", 7);
    this.src = undefined;
    this.nativeProps = {};
  }
  imageOnLoad() {
    const { width, height, } = this.imgRef;
    this.onLoad.emit({
      width,
      height
    });
  }
  imageOnError(e) {
    this.onError.emit(e);
  }
  render() {
    const { src, imageOnLoad, imageOnError, nativeProps } = this;
    return (h("img", Object.assign({ ref: img => (this.imgRef = img), src: src, onLoad: imageOnLoad.bind(this), onError: imageOnError.bind(this) }, nativeProps)));
  }
  static get style() { return indexCss; }
}, [0, "taro-cover-image-core", {
    "src": [1],
    "nativeProps": [16]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-cover-image-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-cover-image-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, CoverImage);
      }
      break;
  } });
}

const TaroCoverImageCore = CoverImage;
const defineCustomElement = defineCustomElement$1;

export { TaroCoverImageCore, defineCustomElement };
