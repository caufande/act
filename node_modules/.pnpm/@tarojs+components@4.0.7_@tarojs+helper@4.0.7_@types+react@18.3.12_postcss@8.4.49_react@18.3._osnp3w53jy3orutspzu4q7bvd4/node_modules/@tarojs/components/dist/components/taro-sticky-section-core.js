import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const StickySection = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('StickySection', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-sticky-section-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-sticky-section-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-sticky-section-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, StickySection);
      }
      break;
  } });
}

const TaroStickySectionCore = StickySection;
const defineCustomElement = defineCustomElement$1;

export { TaroStickySectionCore, defineCustomElement };
