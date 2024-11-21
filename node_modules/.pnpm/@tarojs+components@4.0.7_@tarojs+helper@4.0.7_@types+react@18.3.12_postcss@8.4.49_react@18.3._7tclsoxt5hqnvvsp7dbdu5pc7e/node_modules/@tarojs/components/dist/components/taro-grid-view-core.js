import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const GridView = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('GridView', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-grid-view-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-grid-view-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-grid-view-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, GridView);
      }
      break;
  } });
}

const TaroGridViewCore = GridView;
const defineCustomElement = defineCustomElement$1;

export { TaroGridViewCore, defineCustomElement };
