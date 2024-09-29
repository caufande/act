import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const Lifestyle = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('Lifestyle', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-lifestyle-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-lifestyle-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-lifestyle-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Lifestyle);
      }
      break;
  } });
}

const TaroLifestyleCore = Lifestyle;
const defineCustomElement = defineCustomElement$1;

export { TaroLifestyleCore, defineCustomElement };
