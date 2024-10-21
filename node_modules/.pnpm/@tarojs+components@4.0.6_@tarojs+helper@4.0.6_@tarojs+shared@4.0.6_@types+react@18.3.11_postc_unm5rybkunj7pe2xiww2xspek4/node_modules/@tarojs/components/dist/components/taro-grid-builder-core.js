import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const GridBuilder = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('GridBuilder', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-grid-builder-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-grid-builder-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-grid-builder-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, GridBuilder);
      }
      break;
  } });
}

const TaroGridBuilderCore = GridBuilder;
const defineCustomElement = defineCustomElement$1;

export { TaroGridBuilderCore, defineCustomElement };
