import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const PageContainer = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('PageContainer', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-page-container-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-page-container-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-page-container-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, PageContainer);
      }
      break;
  } });
}

const TaroPageContainerCore = PageContainer;
const defineCustomElement = defineCustomElement$1;

export { TaroPageContainerCore, defineCustomElement };
