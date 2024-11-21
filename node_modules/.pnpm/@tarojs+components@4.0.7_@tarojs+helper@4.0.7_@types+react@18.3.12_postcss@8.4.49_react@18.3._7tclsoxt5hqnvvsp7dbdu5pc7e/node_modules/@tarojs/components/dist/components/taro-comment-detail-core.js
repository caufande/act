import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { n as notSupport } from './helper.js';

const CommentDetail = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    notSupport('CommentDetail', this);
  }
  render() {
    return (h(Host, null));
  }
}, [0, "taro-comment-detail-core"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-comment-detail-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-comment-detail-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, CommentDetail);
      }
      break;
  } });
}

const TaroCommentDetailCore = CommentDetail;
const defineCustomElement = defineCustomElement$1;

export { TaroCommentDetailCore, defineCustomElement };
