import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const Camera = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('Camera', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-camera-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-camera-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-camera-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Camera);
      }
      break;
  } });
}

const TaroCameraCore = Camera;
const defineCustomElement = defineCustomElement$1;

export { TaroCameraCore, defineCustomElement };
