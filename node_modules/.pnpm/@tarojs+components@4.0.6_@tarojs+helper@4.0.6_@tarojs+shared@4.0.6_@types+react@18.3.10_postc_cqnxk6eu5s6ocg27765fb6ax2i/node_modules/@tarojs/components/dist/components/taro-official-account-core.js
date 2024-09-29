import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const OfficialAccount = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('OfficialAccount', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-official-account-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-official-account-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-official-account-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, OfficialAccount);
      }
      break;
  } });
}

const TaroOfficialAccountCore = OfficialAccount;
const defineCustomElement = defineCustomElement$1;

export { TaroOfficialAccountCore, defineCustomElement };
