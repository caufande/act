import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';

const indexCss = ".weui-slider{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding:15px 18px}.weui-slider__inner{background-color:#e9e9e9;height:2px;position:relative}.weui-slider__track{background-color:#1aad19;width:0;height:2px}.weui-slider__handler{background-color:#fff;border-radius:50%;width:28px;height:28px;margin-top:-14px;margin-left:-14px;position:absolute;top:50%;left:0;-webkit-box-shadow:0 0 4px rgba(0,0,0,.2);box-shadow:0 0 4px rgba(0,0,0,.2)}.weui-slider-box{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}.weui-slider-box .weui-slider{-ms-flex:1;flex:1}.weui-slider-box__value{color:#888;text-align:center;min-width:24px;margin-left:.5em;font-size:14px}";

const Slider = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onChange = createEvent(this, "change", 7);
    this.onChanging = createEvent(this, "changing", 7);
    this.handleTouchStart = (e) => {
      if (this.touching || this.disabled)
        return;
      this.touching = true;
      this.touchId = e.targetTouches[0].identifier;
      this.totalWidth = this.sliderInsRef.clientWidth || 1;
      this.ogX = e.targetTouches[0].pageX;
      this.ogPercent = this.percent;
    };
    this.handleTouchMove = (e) => {
      const { disabled, touching, touchId, totalWidth, max, min, ogX, ogPercent } = this;
      if (!touching || disabled)
        return;
      if (e.targetTouches[0].identifier !== touchId)
        return;
      // 阻止默认事件
      e.preventDefault();
      const pageX = e.targetTouches[0].pageX;
      const diffX = pageX - ogX;
      let percent = diffX / totalWidth * 100 + ogPercent;
      percent = this.handleValueUpdate(percent, 0, 100);
      const val = min + percent * 0.01 * (max - min);
      this.updateByStep(val);
      this.onChanging.emit({
        detail: e.detail,
        value: this.value
      });
    };
    this.handleTouchEnd = (e) => {
      const { disabled, touching } = this;
      if (!touching || disabled)
        return;
      if (this.percent !== this.ogPercent) {
        this.onChange.emit({
          detail: e.detail,
          value: this.value
        });
      }
      this.touching = false;
      this.touchId = null;
      this.ogX = 0;
      this.ogPercent = 0;
    };
    this.handleValueUpdate = (e, min = this.min, max = this.max) => {
      e = isNaN(e) ? 0 : e;
      return Math.max(min, Math.min(e, max));
    };
    this.min = 0;
    this.max = 100;
    this.step = 1;
    this.disabled = false;
    this.value = 0;
    this.activeColor = '#1aad19';
    this.backgroundColor = '#e9e9e9';
    this.blockSize = 28;
    this.blockColor = '#ffffff';
    this.showValue = false;
    this.name = '';
    this.totalWidth = 1;
    this.touching = false;
    this.ogX = 0;
    this.touchId = null;
    this.percent = 0;
    this.ogPercent = undefined;
    this.isWillLoadCalled = false;
  }
  function(value) {
    if (!this.isWillLoadCalled)
      return;
    const { max, min } = this;
    if (value !== null) {
      const val = this.handleValueUpdate(value, min, max);
      this.updateByStep(val);
    }
  }
  componentDidLoad() {
    // 在自动化测试时，如果通过 JSX 绑定 touch 事件，
    // 模拟的 touch 事件只会在浏览器的 device mode 下触发，Karma 跑的测试就会跪。
    // 因此改为 didLoad 后 addEventListener 的形式。
    this.handler.addEventListener('touchstart', this.handleTouchStart);
    this.handler.addEventListener('touchmove', this.handleTouchMove);
    this.handler.addEventListener('touchend', this.handleTouchEnd);
  }
  componentWillLoad() {
    this.isWillLoadCalled = true;
    const { value, max, min } = this;
    const val = this.handleValueUpdate(value, min, max);
    this.updateByStep(val);
  }
  // 根据步长 step 修改 value
  updateByStep(value) {
    const { max, min, step } = this;
    const steps = Math.floor((max - min) / step);
    for (let i = 0; i <= steps; i++) {
      const current = min + step * i;
      const next = i === steps ? null : min + step * (i + 1);
      if (value === current)
        break;
      if (!next && value > current) {
        // step 不能被 max - min 整除
        value = current;
      }
      if (next && value > current && value < next) {
        if (value - current < step / 2) {
          value = current;
        }
        else {
          value = next;
        }
        break;
      }
    }
    const percent = (value - min) / (max - min) * 100;
    this.value = value;
    this.percent = percent;
  }
  render() {
    const { showValue, backgroundColor, activeColor, blockColor, name, percent, value } = this;
    let blockSize = this.blockSize;
    const innerStyles = { backgroundColor };
    const percentage = percent > 100 ? 100 : percent;
    const trackStyles = {
      width: `${percentage}%`,
      backgroundColor: activeColor
    };
    if (blockSize < 12) {
      blockSize = 12;
    }
    if (blockSize > 28) {
      blockSize = 28;
    }
    const handlerStyles = {
      left: `${percentage}%`,
      width: `${blockSize}px`,
      height: `${blockSize}px`,
      backgroundColor: blockColor,
      marginTop: `-${Math.floor(blockSize / 2)}px`,
      marginLeft: `-${Math.floor(blockSize / 2)}px`
    };
    return (h(Host, { class: 'weui-slider-box' }, h("div", { class: 'weui-slider' }, h("div", { class: 'weui-slider__inner', style: innerStyles, ref: c => (this.sliderInsRef = c) }, h("div", { style: trackStyles, class: 'weui-slider__track' }), h("div", { class: 'weui-slider__handler', ref: dom => {
        if (dom)
          this.handler = dom;
      }, style: handlerStyles }), h("input", { type: 'hidden', name: name, value: value }))), showValue && h("div", { class: 'weui-slider-box__value' }, value)));
  }
  get el() { return this; }
  static get watchers() { return {
    "value": ["function"]
  }; }
  static get style() { return indexCss; }
}, [0, "taro-slider-core", {
    "min": [2],
    "max": [2],
    "step": [2],
    "disabled": [4],
    "value": [1538],
    "activeColor": [1, "active-color"],
    "backgroundColor": [1, "background-color"],
    "blockSize": [2, "block-size"],
    "blockColor": [1, "block-color"],
    "showValue": [4, "show-value"],
    "name": [1],
    "totalWidth": [32],
    "touching": [32],
    "ogX": [32],
    "touchId": [32],
    "percent": [32],
    "ogPercent": [32],
    "isWillLoadCalled": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-slider-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-slider-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Slider);
      }
      break;
  } });
}

const TaroSliderCore = Slider;
const defineCustomElement = defineCustomElement$1;

export { TaroSliderCore, defineCustomElement };
