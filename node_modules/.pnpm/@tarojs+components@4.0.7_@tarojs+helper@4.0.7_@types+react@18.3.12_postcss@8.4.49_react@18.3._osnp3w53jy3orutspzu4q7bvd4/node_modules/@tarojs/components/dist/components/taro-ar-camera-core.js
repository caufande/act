import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const ArCamera = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('ArCamera', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-ar-camera-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-ar-camera-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-ar-camera-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ArCamera);
      }
      break;
  } });
}

const TaroArCameraCore = ArCamera;
const defineCustomElement = defineCustomElement$1;

export { TaroArCameraCore, defineCustomElement };
