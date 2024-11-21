import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const PageMeta = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('PageMeta', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-page-meta-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-page-meta-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-page-meta-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, PageMeta);
      }
      break;
  } });
}

const TaroPageMetaCore = PageMeta;
const defineCustomElement = defineCustomElement$1;

export { TaroPageMetaCore, defineCustomElement };
