import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const Editor = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('Editor', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-editor-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-editor-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-editor-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Editor);
      }
      break;
  } });
}

const TaroEditorCore = Editor;
const defineCustomElement = defineCustomElement$1;

export { TaroEditorCore, defineCustomElement };
