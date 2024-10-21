import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const MatchMedia = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('MatchMedia', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-match-media-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-match-media-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-match-media-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, MatchMedia);
      }
      break;
  } });
}

const TaroMatchMediaCore = MatchMedia;
const defineCustomElement = defineCustomElement$1;

export { TaroMatchMediaCore, defineCustomElement };
