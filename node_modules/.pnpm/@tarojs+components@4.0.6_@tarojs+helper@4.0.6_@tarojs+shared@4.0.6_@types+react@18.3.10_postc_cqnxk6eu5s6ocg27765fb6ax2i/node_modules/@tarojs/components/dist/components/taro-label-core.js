import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';

const Label = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.for = undefined;
  }
  render() {
    return (h("label", { htmlFor: this.for }, h("slot", null)));
  }
}, [4, "taro-label-core", {
    "for": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-label-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-label-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Label);
      }
      break;
  } });
}

const TaroLabelCore = Label;
const defineCustomElement = defineCustomElement$1;

export { TaroLabelCore, defineCustomElement };
