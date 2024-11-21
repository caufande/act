import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as debounce } from './index3.js';

const columnCss = ".taro-picker-view-column-container{text-align:center;-ms-flex-direction:column;flex-direction:column;-ms-flex:1;flex:1;display:-ms-flexbox;display:flex;position:relative;overflow:hidden scroll}.taro-picker-view-column-container::-webkit-scrollbar{display:none}";

const PickerViewColumn = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onChange = createEvent(this, "onselect", 7);
    this.onSelectStart = createEvent(this, "onselectstart", 7);
    this.onSelectEnd = createEvent(this, "onselectend", 7);
    // 滚动结束自动回到合适的位置
    this.handleSelected = debounce(() => {
      const childList = this.el.childNodes;
      let sum = 0;
      let selectedIndex = '0';
      for (const index in childList) {
        const item = childList[index];
        const itemHeight = item.offsetHeight;
        if (sum + itemHeight / 2.0 > this.el.scrollTop) {
          selectedIndex = index;
          break;
        }
        sum += itemHeight;
      }
      this.el.scrollTo({
        top: sum,
        behavior: 'smooth'
      });
      this.onChange.emit({
        curIndex: this.col,
        selectedIndex: selectedIndex
      });
      this.onSelectEnd.emit();
    }, 500);
    this.col = undefined;
    this.initialPosition = '0';
    this.paddingVertical = 0;
    this.isInit = false;
  }
  onTouchStart() {
    this.onSelectStart.emit();
  }
  onTouchEnd() {
    this.handleSelected();
  }
  componentDidLoad() {
    this.handleChange();
  }
  componentDidUpdate() {
    this.handleChange();
  }
  handleChange() {
    const childList = this.el.childNodes;
    let idx = 0;
    let sum = 0;
    for (const index in childList) {
      const item = childList[index];
      if (this.initialPosition === index || !item || typeof item.offsetHeight !== 'number') {
        break;
      }
      sum += item.offsetHeight;
      idx++;
    }
    this.el.scrollTo({ top: sum });
    if (idx >= childList.length) {
      this.onChange.emit({
        curIndex: this.col,
        selectedIndex: idx - 1
      });
    }
  }
  render() {
    const { paddingVertical = 0 } = this;
    return (h(Host, { class: "taro-picker-view-column-container", style: { 'padding-top': `${paddingVertical}px`, 'padding-bottom': `${paddingVertical}px` } }));
  }
  get el() { return this; }
  static get style() { return columnCss; }
}, [0, "taro-picker-view-column-core", {
    "col": [1],
    "initialPosition": [1, "initial-position"],
    "paddingVertical": [2, "padding-vertical"],
    "isInit": [32]
  }, [[1, "touchstart", "onTouchStart"], [1, "touchend", "onTouchEnd"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-picker-view-column-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-picker-view-column-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, PickerViewColumn);
      }
      break;
  } });
}

const TaroPickerViewColumnCore = PickerViewColumn;
const defineCustomElement = defineCustomElement$1;

export { TaroPickerViewColumnCore, defineCustomElement };
