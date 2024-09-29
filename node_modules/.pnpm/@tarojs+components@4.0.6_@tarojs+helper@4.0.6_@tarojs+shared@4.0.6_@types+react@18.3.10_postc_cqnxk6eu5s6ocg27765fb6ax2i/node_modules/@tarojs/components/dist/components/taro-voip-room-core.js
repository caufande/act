import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const VoipRoom = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('VoipRoom', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-voip-room-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-voip-room-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-voip-room-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, VoipRoom);
      }
      break;
  } });
}

const TaroVoipRoomCore = VoipRoom;
const defineCustomElement = defineCustomElement$1;

export { TaroVoipRoomCore, defineCustomElement };
