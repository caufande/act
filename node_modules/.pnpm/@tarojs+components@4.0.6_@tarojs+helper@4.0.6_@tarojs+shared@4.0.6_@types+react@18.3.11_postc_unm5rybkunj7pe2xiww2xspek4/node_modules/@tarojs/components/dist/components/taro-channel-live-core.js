import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const ChannelLive = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('ChannelLive', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-channel-live-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-channel-live-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-channel-live-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ChannelLive);
      }
      break;
  } });
}

const TaroChannelLiveCore = ChannelLive;
const defineCustomElement = defineCustomElement$1;

export { TaroChannelLiveCore, defineCustomElement };
