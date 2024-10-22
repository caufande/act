import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const AdCustom = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('AdCustom', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-ad-custom-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-ad-custom-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-ad-custom-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, AdCustom);
      }
      break;
  } });
}

const TaroAdCustomCore = AdCustom;
const defineCustomElement = defineCustomElement$1;

export { TaroAdCustomCore, defineCustomElement };
