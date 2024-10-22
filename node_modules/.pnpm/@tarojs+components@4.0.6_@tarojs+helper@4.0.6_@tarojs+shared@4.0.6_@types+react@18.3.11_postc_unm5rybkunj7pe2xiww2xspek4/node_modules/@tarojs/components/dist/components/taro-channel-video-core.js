import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const ChannelVideo = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('ChannelVideo', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-channel-video-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-channel-video-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-channel-video-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ChannelVideo);
      }
      break;
  } });
}

const TaroChannelVideoCore = ChannelVideo;
const defineCustomElement = defineCustomElement$1;

export { TaroChannelVideoCore, defineCustomElement };
