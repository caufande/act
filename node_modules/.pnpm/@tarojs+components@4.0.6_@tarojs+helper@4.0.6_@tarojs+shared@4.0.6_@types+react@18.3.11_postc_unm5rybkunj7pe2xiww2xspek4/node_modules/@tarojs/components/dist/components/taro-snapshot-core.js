import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const Snapshot = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('Snapshot', this);
  }
  render() {
    return h(Host, null);
  }
}, [0, "taro-snapshot-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-snapshot-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-snapshot-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Snapshot);
      }
      break;
  } });
}

const TaroSnapshotCore = Snapshot;
const defineCustomElement = defineCustomElement$1;

export { TaroSnapshotCore, defineCustomElement };
