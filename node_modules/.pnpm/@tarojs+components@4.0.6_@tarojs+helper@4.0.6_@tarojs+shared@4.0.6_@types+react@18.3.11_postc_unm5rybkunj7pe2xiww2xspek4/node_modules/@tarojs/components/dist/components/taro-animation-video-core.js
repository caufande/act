import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const AnimationVideo = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('AnimationVideo', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-animation-video-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-animation-video-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-animation-video-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, AnimationVideo);
      }
      break;
  } });
}

const TaroAnimationVideoCore = AnimationVideo;
const defineCustomElement = defineCustomElement$1;

export { TaroAnimationVideoCore, defineCustomElement };
