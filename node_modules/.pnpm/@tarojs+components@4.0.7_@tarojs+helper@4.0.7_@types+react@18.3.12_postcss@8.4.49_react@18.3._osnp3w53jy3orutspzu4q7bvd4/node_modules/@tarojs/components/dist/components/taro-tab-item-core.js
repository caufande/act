import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const TabItem = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('TabItem', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-tab-item-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-tab-item-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-tab-item-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TabItem);
      }
      break;
  } });
}

const TaroTabItemCore = TabItem;
const defineCustomElement = defineCustomElement$1;

export { TaroTabItemCore, defineCustomElement };
