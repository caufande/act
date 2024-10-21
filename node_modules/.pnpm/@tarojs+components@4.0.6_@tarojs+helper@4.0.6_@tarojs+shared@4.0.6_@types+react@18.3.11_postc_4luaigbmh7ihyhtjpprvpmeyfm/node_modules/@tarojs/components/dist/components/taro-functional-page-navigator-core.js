import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const FunctionalPageNavigator = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('FunctionalPageNavigator', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-functional-page-navigator-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-functional-page-navigator-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-functional-page-navigator-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, FunctionalPageNavigator);
      }
      break;
  } });
}

const TaroFunctionalPageNavigatorCore = FunctionalPageNavigator;
const defineCustomElement = defineCustomElement$1;

export { TaroFunctionalPageNavigatorCore, defineCustomElement };
