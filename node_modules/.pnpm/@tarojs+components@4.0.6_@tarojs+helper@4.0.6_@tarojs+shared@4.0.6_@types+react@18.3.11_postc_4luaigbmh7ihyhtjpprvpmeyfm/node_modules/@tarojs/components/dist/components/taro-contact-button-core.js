import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const ContactButton = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('ContactButton', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-contact-button-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-contact-button-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-contact-button-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ContactButton);
      }
      break;
  } });
}

const TaroContactButtonCore = ContactButton;
const defineCustomElement = defineCustomElement$1;

export { TaroContactButtonCore, defineCustomElement };
