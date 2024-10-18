import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const NestedScrollHeader = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('NestedScrollHeader', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-nested-scroll-header-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-nested-scroll-header-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-nested-scroll-header-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, NestedScrollHeader);
      }
      break;
  } });
}

const TaroNestedScrollHeaderCore = NestedScrollHeader;
const defineCustomElement = defineCustomElement$1;

export { TaroNestedScrollHeaderCore, defineCustomElement };
