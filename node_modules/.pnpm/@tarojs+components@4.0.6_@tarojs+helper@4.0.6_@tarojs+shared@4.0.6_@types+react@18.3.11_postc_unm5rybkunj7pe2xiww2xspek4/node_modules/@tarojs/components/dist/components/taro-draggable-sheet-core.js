import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const DraggableSheet = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('DraggableSheet', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-draggable-sheet-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-draggable-sheet-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-draggable-sheet-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, DraggableSheet);
      }
      break;
  } });
}

const TaroDraggableSheetCore = DraggableSheet;
const defineCustomElement = defineCustomElement$1;

export { TaroDraggableSheetCore, defineCustomElement };
