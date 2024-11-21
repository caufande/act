import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const Like = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('Like', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-like-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-like-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-like-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Like);
      }
      break;
  } });
}

const TaroLikeCore = Like;
const defineCustomElement = defineCustomElement$1;

export { TaroLikeCore, defineCustomElement };
