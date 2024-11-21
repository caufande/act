import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const ListBuilder = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('ListBuilder', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-list-builder-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-list-builder-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-list-builder-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ListBuilder);
      }
      break;
  } });
}

const TaroListBuilderCore = ListBuilder;
const defineCustomElement = defineCustomElement$1;

export { TaroListBuilderCore, defineCustomElement };
