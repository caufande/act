import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const Ad = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('Ad', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-ad-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-ad-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-ad-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Ad);
      }
      break;
  } });
}

const TaroAdCore = Ad;
const defineCustomElement = defineCustomElement$1;

export { TaroAdCore, defineCustomElement };
