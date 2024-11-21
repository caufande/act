import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const AnimationView = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('AnimationView', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-animation-view-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-animation-view-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-animation-view-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, AnimationView);
      }
      break;
  } });
}

const TaroAnimationViewCore = AnimationView;
const defineCustomElement = defineCustomElement$1;

export { TaroAnimationViewCore, defineCustomElement };
