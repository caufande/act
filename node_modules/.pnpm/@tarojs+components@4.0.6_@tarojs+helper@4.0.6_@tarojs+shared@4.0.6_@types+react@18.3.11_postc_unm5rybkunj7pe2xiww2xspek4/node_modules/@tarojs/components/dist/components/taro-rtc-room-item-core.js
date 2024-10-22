import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const RtcRoomItem = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('RtcRoomItem', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-rtc-room-item-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-rtc-room-item-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-rtc-room-item-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, RtcRoomItem);
      }
      break;
  } });
}

const TaroRtcRoomItemCore = RtcRoomItem;
const defineCustomElement = defineCustomElement$1;

export { TaroRtcRoomItemCore, defineCustomElement };
