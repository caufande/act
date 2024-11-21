import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const Tabs = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('Tabs', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-tabs-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-tabs-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-tabs-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Tabs);
      }
      break;
  } });
}

const TaroTabsCore = Tabs;
const defineCustomElement = defineCustomElement$1;

export { TaroTabsCore, defineCustomElement };
