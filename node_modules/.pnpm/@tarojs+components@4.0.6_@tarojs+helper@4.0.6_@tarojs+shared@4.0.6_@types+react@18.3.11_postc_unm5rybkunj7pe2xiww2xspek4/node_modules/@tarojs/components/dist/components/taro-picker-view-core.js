import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as classnames } from './index2.js';

function convertStyle(style) {
  if (style) {
    const regex = /([\w-]*)\s*:\s*([^;]*)/g;
    const properties = {};
    let match;
    while ((match = regex.exec(style)))
      properties[`${match[1]}`] = match[2].trim();
    return properties;
  }
}

const indexCss = ".taro-picker-view-container{display:-ms-flexbox;display:flex;position:relative}.taro-picker-view-mask-container{pointer-events:none;-ms-flex-direction:column;flex-direction:column;display:-ms-flexbox;display:flex;position:absolute;inset:0}.taro-picker-view-mask-indicator{border-top:1px solid #ddd;border-bottom:1px solid #ddd;height:50px;display:-ms-flexbox;display:flex}.taro-picker-view-mask-top{background-image:-webkit-gradient(linear,left top, left bottom,from(rgba(255,255,255,.95)),to(rgba(255,255,255,.6)));background-image:linear-gradient(rgba(255,255,255,.95),rgba(255,255,255,.6));-ms-flex:1;flex:1}.taro-picker-view-mask-bottom{background:-webkit-gradient(linear,left top, left bottom,from(rgba(255,255,255,.6)),to(rgba(255,255,255,.95)));background:linear-gradient(rgba(255,255,255,.6),rgba(255,255,255,.95));-ms-flex:1;flex:1}";

const PickerView = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onChange = createEvent(this, "change", 7);
    this.onPickStart = createEvent(this, "pickstart", 7);
    this.onPickEnd = createEvent(this, "pickend", 7);
    this.indicatorStyle = undefined;
    this.indicatorClass = undefined;
    this.value = undefined;
    this.maskStyle = undefined;
    this.maskClass = undefined;
  }
  onPropsChange() {
    this.handleValueChange();
  }
  onSelect(e) {
    e.stopPropagation();
    if (e.target.tagName !== 'TARO-PICKER-VIEW-COLUMN-CORE')
      return;
    let _curIndex = +e.detail.curIndex;
    let _selectedIndex = +e.detail.selectedIndex;
    this.value[_curIndex] = _selectedIndex;
    this.onChange.emit({ value: this.value });
  }
  onSelectStart(e) {
    e.stopPropagation();
    if (e.target.tagName !== 'TARO-PICKER-VIEW-COLUMN-CORE')
      return;
    this.onPickStart.emit();
  }
  onPickerColEnd(e) {
    e.stopPropagation();
    if (e.target.tagName !== 'TARO-PICKER-VIEW-COLUMN-CORE')
      return;
    this.onPickEnd.emit();
  }
  componentDidLoad() {
    this.handleValueChange();
  }
  handleValueChange() {
    const childList = this.el.querySelectorAll('taro-picker-view-column-core');
    childList.forEach((element, index) => {
      var _a;
      element.setAttribute('col', `${index}`);
      let selectIndex = 0;
      if (!!this.value && this.value.length > index) {
        selectIndex = this.value[index];
      }
      const pickerHeight = this.el.getBoundingClientRect().height;
      const indicatorHeight = ((_a = this.indicator) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0;
      const paddingVertical = (pickerHeight - indicatorHeight) / 2.0;
      element.setAttribute('initial-position', `${selectIndex}`);
      element.setAttribute('padding-vertical', `${paddingVertical}`);
    });
  }
  // 过滤非 PickerViewColumn 组件
  componentDidRender() {
    this.el.childNodes.forEach(item => {
      const childEle = item;
      if ('TARO-PICKER-VIEW-COLUMN-CORE' !== childEle.tagName &&
        childEle.className !== 'taro-picker-view-mask-container') {
        this.el.removeChild(item);
      }
    });
  }
  render() {
    const indicatorCls = classnames('taro-picker-view-mask-indicator', this.indicatorClass);
    const maskTopCls = classnames('taro-picker-view-mask-top', this.maskClass);
    const maskBtmCls = classnames('taro-picker-view-mask-bottom', this.maskClass);
    const indicatorStyle = convertStyle(this.indicatorStyle);
    const maskTopStyle = convertStyle(this.maskStyle);
    const maskBottomStyle = convertStyle(this.maskStyle);
    return (h(Host, { class: "taro-picker-view-container" }, h("slot", null), h("div", { class: "taro-picker-view-mask-container" }, h("div", { class: maskTopCls, style: maskTopStyle }), h("div", { class: indicatorCls, style: indicatorStyle, ref: indicator => (this.indicator = indicator) }), h("div", { class: maskBtmCls, style: maskBottomStyle }))));
  }
  get el() { return this; }
  static get watchers() { return {
    "value": ["onPropsChange"]
  }; }
  static get style() { return indexCss; }
}, [4, "taro-picker-view-core", {
    "indicatorStyle": [1, "indicator-style"],
    "indicatorClass": [1, "indicator-class"],
    "value": [16],
    "maskStyle": [1, "mask-style"],
    "maskClass": [1, "mask-class"]
  }, [[0, "onselect", "onSelect"], [0, "onselectstart", "onSelectStart"], [0, "onselectend", "onPickerColEnd"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-picker-view-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-picker-view-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, PickerView);
      }
      break;
  } });
}

const TaroPickerViewCore = PickerView;
const defineCustomElement = defineCustomElement$1;

export { TaroPickerViewCore, defineCustomElement };
