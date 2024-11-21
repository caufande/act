import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const LivePusher = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('LivePusher', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-live-pusher-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-live-pusher-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-live-pusher-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, LivePusher);
      }
      break;
  } });
}

const TaroLivePusherCore = LivePusher;
const defineCustomElement = defineCustomElement$1;

export { TaroLivePusherCore, defineCustomElement };
