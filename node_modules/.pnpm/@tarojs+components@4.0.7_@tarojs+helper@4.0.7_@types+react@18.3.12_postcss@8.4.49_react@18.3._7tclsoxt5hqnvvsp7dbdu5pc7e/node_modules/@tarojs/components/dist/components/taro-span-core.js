import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const Span = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('Span', this);
  }
  render() {
    return h(Host, null);
  }
}, [0, "taro-span-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-span-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-span-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Span);
      }
      break;
  } });
}

const TaroSpanCore = Span;
const defineCustomElement = defineCustomElement$1;

export { TaroSpanCore, defineCustomElement };
