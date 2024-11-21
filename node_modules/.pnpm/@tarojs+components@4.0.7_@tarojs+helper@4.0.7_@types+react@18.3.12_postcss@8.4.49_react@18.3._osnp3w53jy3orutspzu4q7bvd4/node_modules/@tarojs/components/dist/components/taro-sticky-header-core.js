import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const StickyHeader = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('StickyHeader', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-sticky-header-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-sticky-header-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-sticky-header-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, StickyHeader);
      }
      break;
  } });
}

const TaroStickyHeaderCore = StickyHeader;
const defineCustomElement = defineCustomElement$1;

export { TaroStickyHeaderCore, defineCustomElement };
