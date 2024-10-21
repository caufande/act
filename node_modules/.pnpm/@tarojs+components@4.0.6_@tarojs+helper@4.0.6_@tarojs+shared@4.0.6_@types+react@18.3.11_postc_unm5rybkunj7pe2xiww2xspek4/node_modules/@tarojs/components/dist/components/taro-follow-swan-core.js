import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const FollowSwan = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('FollowSwan', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-follow-swan-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-follow-swan-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-follow-swan-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, FollowSwan);
      }
      break;
  } });
}

const TaroFollowSwanCore = FollowSwan;
const defineCustomElement = defineCustomElement$1;

export { TaroFollowSwanCore, defineCustomElement };
