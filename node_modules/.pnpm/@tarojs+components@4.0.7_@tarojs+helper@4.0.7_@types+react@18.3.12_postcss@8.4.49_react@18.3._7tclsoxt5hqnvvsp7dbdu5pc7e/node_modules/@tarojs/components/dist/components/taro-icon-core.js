import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';

const indexCss = ".weui-icon-circle:before{content:\"\"}.weui-icon-download:before{content:\"\"}.weui-icon-info:before{content:\"\"}.weui-icon-safe-success:before{content:\"\"}.weui-icon-safe-warn:before{content:\"\"}.weui-icon-success:before{content:\"\"}.weui-icon-success-circle:before{content:\"\"}.weui-icon-success-no-circle:before{content:\"\"}.weui-icon-waiting:before{content:\"\"}.weui-icon-waiting-circle:before{content:\"\"}.weui-icon-warn:before{content:\"\"}.weui-icon-info-circle:before{content:\"\"}.weui-icon-cancel:before{content:\"\"}.weui-icon-search:before{content:\"\"}.weui-icon-clear:before{content:\"\"}.weui-icon-back:before{content:\"\"}.weui-icon-delete:before{content:\"\"}.weui-icon-success{color:#09bb07;font-size:23px}.weui-icon-waiting{color:#10aeff;font-size:23px}.weui-icon-warn{color:#f43530;font-size:23px}.weui-icon-info{color:#10aeff;font-size:23px}.weui-icon-success-circle,.weui-icon-success-no-circle{color:#09bb07;font-size:23px}.weui-icon-waiting-circle{color:#10aeff;font-size:23px}.weui-icon-circle{color:#c9c9c9;font-size:23px}.weui-icon-download,.weui-icon-info-circle{color:#09bb07;font-size:23px}.weui-icon-safe-success{color:#09bb07}.weui-icon-safe-warn{color:#ffbe00}.weui-icon-cancel{color:#f43530;font-size:22px}.weui-icon-search,.weui-icon-clear{color:#b2b2b2;font-size:14px}.weui-icon-delete.weui-icon_gallery-delete{color:#fff;font-size:22px}.weui-icon_msg{font-size:93px}.weui-icon_msg.weui-icon-warn{color:#f76260}.weui-icon_msg-primary{font-size:93px}.weui-icon_msg-primary.weui-icon-warn{color:#ffbe00}";

const Icon = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.type = undefined;
    this.size = '23';
    this.color = undefined;
  }
  render() {
    const { type, size, color } = this;
    const iconType = type === null || type === void 0 ? void 0 : type.replace(/_/g, '-');
    const cls = classnames({
      [`weui-icon-${iconType}`]: true
    });
    const style = {
      'font-size': `${size}px`,
      color
    };
    return (h(Host, { class: cls, style: style }));
  }
  static get style() { return indexCss; }
}, [0, "taro-icon-core", {
    "type": [1],
    "size": [8],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-icon-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-icon-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Icon);
      }
      break;
  } });
}

const TaroIconCore = Icon;
const defineCustomElement = defineCustomElement$1;

export { TaroIconCore, defineCustomElement };
