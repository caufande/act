import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const ListView = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('ListView', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-list-view-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-list-view-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-list-view-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ListView);
      }
      break;
  } });
}

const TaroListViewCore = ListView;
const defineCustomElement = defineCustomElement$1;

export { TaroListViewCore, defineCustomElement };
