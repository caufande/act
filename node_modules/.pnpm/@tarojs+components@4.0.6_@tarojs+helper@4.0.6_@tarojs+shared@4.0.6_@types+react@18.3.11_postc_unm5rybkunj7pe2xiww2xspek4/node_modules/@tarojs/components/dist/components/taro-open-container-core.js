import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const OpenContainer = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('OpenContainer', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-open-container-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-open-container-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-open-container-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, OpenContainer);
      }
      break;
  } });
}

const TaroOpenContainerCore = OpenContainer;
const defineCustomElement = defineCustomElement$1;

export { TaroOpenContainerCore, defineCustomElement };
