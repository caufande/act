import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const KeyboardAccessory = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('KeyboardAccessory', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-keyboard-accessory-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-keyboard-accessory-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-keyboard-accessory-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, KeyboardAccessory);
      }
      break;
  } });
}

const TaroKeyboardAccessoryCore = KeyboardAccessory;
const defineCustomElement = defineCustomElement$1;

export { TaroKeyboardAccessoryCore, defineCustomElement };
