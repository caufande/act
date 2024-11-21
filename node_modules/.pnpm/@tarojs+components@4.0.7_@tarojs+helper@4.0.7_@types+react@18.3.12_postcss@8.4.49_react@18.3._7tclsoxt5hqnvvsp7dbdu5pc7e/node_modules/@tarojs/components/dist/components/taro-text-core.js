import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const indexCss = "taro-text-core{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:inline}taro-text-core[selectable=true],taro-text-core[user-select=true]{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;display:inline-block}taro-text-core[space]{white-space:pre-wrap}taro-text-core[space=ensp]{word-spacing:.5em}taro-text-core[space=nbsp]{word-spacing:1em}taro-text-core[number-of-lines]{--line-clamp:2;word-wrap:break-word;text-overflow:ellipsis;-webkit-line-clamp:var(--line-clamp);-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}";

const Text = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.selectable = false;
    this.userSelect = false;
    this.space = undefined;
    this.numberOfLines = undefined;
  }
  render() {
    const style = {};
    if (typeof this.numberOfLines === 'number') {
      style['--line-clamp'] = this.numberOfLines;
    }
    return (h(Host, { style: style }, h("slot", null)));
  }
  static get style() { return indexCss; }
}, [4, "taro-text-core", {
    "selectable": [1028],
    "userSelect": [1028, "user-select"],
    "space": [1025],
    "numberOfLines": [2, "number-of-lines"]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-text-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-text-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Text);
      }
      break;
  } });
}

const TaroTextCore = Text;
const defineCustomElement = defineCustomElement$1;

export { TaroTextCore, defineCustomElement };
