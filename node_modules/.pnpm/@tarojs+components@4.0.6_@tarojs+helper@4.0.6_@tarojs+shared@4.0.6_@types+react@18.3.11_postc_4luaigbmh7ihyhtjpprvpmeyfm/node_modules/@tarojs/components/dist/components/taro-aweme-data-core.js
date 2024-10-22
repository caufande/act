import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const AwemeData = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('AwemeData', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-aweme-data-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-aweme-data-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-aweme-data-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, AwemeData);
      }
      break;
  } });
}

const TaroAwemeDataCore = AwemeData;
const defineCustomElement = defineCustomElement$1;

export { TaroAwemeDataCore, defineCustomElement };
