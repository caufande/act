import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const Lottie = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('Lottie', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-lottie-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-lottie-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-lottie-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Lottie);
      }
      break;
  } });
}

const TaroLottieCore = Lottie;
const defineCustomElement = defineCustomElement$1;

export { TaroLottieCore, defineCustomElement };
