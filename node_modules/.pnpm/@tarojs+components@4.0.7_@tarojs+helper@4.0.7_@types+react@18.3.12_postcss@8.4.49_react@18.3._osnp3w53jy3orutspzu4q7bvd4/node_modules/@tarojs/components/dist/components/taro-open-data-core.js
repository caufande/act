import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const OpenData = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('OpenData', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-open-data-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-open-data-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-open-data-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, OpenData);
      }
      break;
  } });
}

const TaroOpenDataCore = OpenData;
const defineCustomElement = defineCustomElement$1;

export { TaroOpenDataCore, defineCustomElement };
