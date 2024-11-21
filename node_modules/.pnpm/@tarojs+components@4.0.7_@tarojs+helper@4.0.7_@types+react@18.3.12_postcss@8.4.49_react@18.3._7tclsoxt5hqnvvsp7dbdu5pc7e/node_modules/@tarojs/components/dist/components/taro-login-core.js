import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const Login = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('Login', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-login-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-login-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-login-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Login);
      }
      break;
  } });
}

const TaroLoginCore = Login;
const defineCustomElement = defineCustomElement$1;

export { TaroLoginCore, defineCustomElement };
