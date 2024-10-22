import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const RtcRoom = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('RtcRoom', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-rtc-room-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-rtc-room-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-rtc-room-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, RtcRoom);
      }
      break;
  } });
}

const TaroRtcRoomCore = RtcRoom;
const defineCustomElement = defineCustomElement$1;

export { TaroRtcRoomCore, defineCustomElement };
