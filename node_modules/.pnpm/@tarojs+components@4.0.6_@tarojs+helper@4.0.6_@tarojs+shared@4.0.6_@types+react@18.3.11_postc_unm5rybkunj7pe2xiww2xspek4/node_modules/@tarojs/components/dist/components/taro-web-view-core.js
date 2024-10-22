import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';

const indexCss = "iframe{border:none}.taro-webview{z-index:999;width:100%;height:100%;position:fixed;top:0;bottom:0}";

const WebView = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onLoad = createEvent(this, "load", 7);
    this.onError = createEvent(this, "error", 7);
    this.src = undefined;
  }
  render() {
    const { src, onLoad, onError } = this;
    return (h("iframe", { class: 'taro-webview', onLoad: (e) => {
        e.stopPropagation();
        onLoad.emit({ src });
      }, onError: (e) => {
        e.stopPropagation();
        onError.emit({ src });
      }, src: src }));
  }
  static get style() { return indexCss; }
}, [0, "taro-web-view-core", {
    "src": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-web-view-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-web-view-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WebView);
      }
      break;
  } });
}

const TaroWebViewCore = WebView;
const defineCustomElement = defineCustomElement$1;

export { TaroWebViewCore, defineCustomElement };
