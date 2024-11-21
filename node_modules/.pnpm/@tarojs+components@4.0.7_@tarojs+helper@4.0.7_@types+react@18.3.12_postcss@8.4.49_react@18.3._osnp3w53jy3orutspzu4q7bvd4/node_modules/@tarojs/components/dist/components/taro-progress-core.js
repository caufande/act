import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const indexCss = ".weui-progress{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}.weui-progress__bar{background-color:#ebebeb;-ms-flex:1;flex:1;height:3px}.weui-progress__inner-bar{background-color:#09bb07;width:0;height:100%}.weui-progress__opr{margin-left:15px;font-size:0;display:block}";

const Progress = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.percent = 0;
    this.showInfo = false;
    this.borderRadius = 0;
    this.fontSize = 16;
    this.strokeWidth = 6;
    this.activeColor = '#09BB07';
    this.backgroundColor = '#EBEBEB';
    this.active = false;
  }
  render() {
    const { percent, showInfo, borderRadius, fontSize, strokeWidth, activeColor, backgroundColor, active } = this;
    const pgPercent = percent > 100 ? 100 : percent < 0 ? 0 : percent;
    const pgHeight = {
      height: strokeWidth + 'px',
      backgroundColor
    };
    const transition = active ? 'width 1s ease-in-out' : 'none';
    const pgWidth = {
      width: `${pgPercent}%`,
      transition,
      WebkitTransition: transition,
      backgroundColor: activeColor,
      borderRadius: borderRadius ? `${borderRadius}px` : '0px'
    };
    return (h(Host, { class: 'weui-progress' }, h("div", { class: 'weui-progress__bar', style: pgHeight }, h("div", { class: 'weui-progress__inner-bar', style: pgWidth })), showInfo && (h("div", { class: 'weui-progress__opr', style: { 'font-size': `${fontSize}px` } }, h("span", null, pgPercent, "%")))));
  }
  static get style() { return indexCss; }
}, [0, "taro-progress-core", {
    "percent": [2],
    "showInfo": [4, "show-info"],
    "borderRadius": [8, "border-radius"],
    "fontSize": [8, "font-size"],
    "strokeWidth": [8, "stroke-width"],
    "activeColor": [1, "active-color"],
    "backgroundColor": [1, "background-color"],
    "active": [4]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-progress-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-progress-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Progress);
      }
      break;
  } });
}

const TaroProgressCore = Progress;
const defineCustomElement = defineCustomElement$1;

export { TaroProgressCore, defineCustomElement };
