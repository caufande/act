import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const Block = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-block-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-block-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-block-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Block);
      }
      break;
  } });
}

const TaroBlockCore = Block;
const defineCustomElement = defineCustomElement$1;

export { TaroBlockCore, defineCustomElement };
