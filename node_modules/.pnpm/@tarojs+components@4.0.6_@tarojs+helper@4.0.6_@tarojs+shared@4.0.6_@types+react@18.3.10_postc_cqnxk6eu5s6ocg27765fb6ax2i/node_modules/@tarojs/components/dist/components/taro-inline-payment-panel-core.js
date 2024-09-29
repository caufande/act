import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const InlinePaymentPanel = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('InlinePaymentPanel', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-inline-payment-panel-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-inline-payment-panel-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-inline-payment-panel-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, InlinePaymentPanel);
      }
      break;
  } });
}

const TaroInlinePaymentPanelCore = InlinePaymentPanel;
const defineCustomElement = defineCustomElement$1;

export { TaroInlinePaymentPanelCore, defineCustomElement };
