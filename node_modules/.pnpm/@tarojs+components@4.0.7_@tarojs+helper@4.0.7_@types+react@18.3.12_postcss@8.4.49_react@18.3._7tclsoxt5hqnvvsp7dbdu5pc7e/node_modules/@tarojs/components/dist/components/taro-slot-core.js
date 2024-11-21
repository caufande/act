import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const Slot = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('Slot', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-slot-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-slot-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-slot-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Slot);
      }
      break;
  } });
}

const TaroSlotCore = Slot;
const defineCustomElement = defineCustomElement$1;

export { TaroSlotCore, defineCustomElement };
