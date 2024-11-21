import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const NavigationBar = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('NavigationBar', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-navigation-bar-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-navigation-bar-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-navigation-bar-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, NavigationBar);
      }
      break;
  } });
}

const TaroNavigationBarCore = NavigationBar;
const defineCustomElement = defineCustomElement$1;

export { TaroNavigationBarCore, defineCustomElement };
