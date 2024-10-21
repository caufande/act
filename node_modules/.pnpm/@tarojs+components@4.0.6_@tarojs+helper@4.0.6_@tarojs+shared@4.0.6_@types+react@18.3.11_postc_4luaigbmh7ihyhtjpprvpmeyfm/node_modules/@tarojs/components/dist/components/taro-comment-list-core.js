import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const CommentList = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('CommentList', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-comment-list-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-comment-list-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-comment-list-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, CommentList);
      }
      break;
  } });
}

const TaroCommentListCore = CommentList;
const defineCustomElement = defineCustomElement$1;

export { TaroCommentListCore, defineCustomElement };
