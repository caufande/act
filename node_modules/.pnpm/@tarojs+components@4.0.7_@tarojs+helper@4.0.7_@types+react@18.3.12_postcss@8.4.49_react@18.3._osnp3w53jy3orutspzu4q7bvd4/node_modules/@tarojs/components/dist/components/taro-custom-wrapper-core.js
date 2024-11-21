import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const CustomWrapper = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-custom-wrapper-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-custom-wrapper-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-custom-wrapper-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, CustomWrapper);
      }
      break;
  } });
}

const TaroCustomWrapperCore = CustomWrapper;
const defineCustomElement = defineCustomElement$1;

export { TaroCustomWrapperCore, defineCustomElement };
