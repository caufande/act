import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const RootPortal = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('RootPortal', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-root-portal-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-root-portal-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-root-portal-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, RootPortal);
      }
      break;
  } });
}

const TaroRootPortalCore = RootPortal;
const defineCustomElement = defineCustomElement$1;

export { TaroRootPortalCore, defineCustomElement };
