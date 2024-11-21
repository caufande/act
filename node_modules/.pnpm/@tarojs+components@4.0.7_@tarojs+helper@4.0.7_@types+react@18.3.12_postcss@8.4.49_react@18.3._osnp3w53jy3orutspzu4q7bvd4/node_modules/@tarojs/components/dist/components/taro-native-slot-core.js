import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const NativeSlot = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('NativeSlot', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-native-slot-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-native-slot-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-native-slot-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, NativeSlot);
      }
      break;
  } });
}

const TaroNativeSlotCore = NativeSlot;
const defineCustomElement = defineCustomElement$1;

export { TaroNativeSlotCore, defineCustomElement };
