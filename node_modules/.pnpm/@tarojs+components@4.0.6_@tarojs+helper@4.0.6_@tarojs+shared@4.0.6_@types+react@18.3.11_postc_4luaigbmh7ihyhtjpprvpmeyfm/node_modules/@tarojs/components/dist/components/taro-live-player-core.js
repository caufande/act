import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const LivePlayer = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('LivePlayer', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-live-player-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-live-player-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-live-player-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, LivePlayer);
      }
      break;
  } });
}

const TaroLivePlayerCore = LivePlayer;
const defineCustomElement = defineCustomElement$1;

export { TaroLivePlayerCore, defineCustomElement };
