import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const ShareElement = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('ShareElement', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-share-element-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-share-element-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-share-element-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ShareElement);
      }
      break;
  } });
}

const TaroShareElementCore = ShareElement;
const defineCustomElement = defineCustomElement$1;

export { TaroShareElementCore, defineCustomElement };
