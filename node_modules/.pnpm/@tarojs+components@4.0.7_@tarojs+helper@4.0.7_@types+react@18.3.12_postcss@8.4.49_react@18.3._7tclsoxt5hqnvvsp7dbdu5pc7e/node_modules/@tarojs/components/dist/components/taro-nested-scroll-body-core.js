import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const NestedScrollBody = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('NestedScrollBody', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-nested-scroll-body-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-nested-scroll-body-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-nested-scroll-body-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, NestedScrollBody);
      }
      break;
  } });
}

const TaroNestedScrollBodyCore = NestedScrollBody;
const defineCustomElement = defineCustomElement$1;

export { TaroNestedScrollBodyCore, defineCustomElement };
