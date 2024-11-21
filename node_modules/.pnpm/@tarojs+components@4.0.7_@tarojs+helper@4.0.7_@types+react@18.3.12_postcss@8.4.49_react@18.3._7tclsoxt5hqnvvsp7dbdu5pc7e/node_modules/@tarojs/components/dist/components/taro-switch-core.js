import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';

const indexCss = ".weui-cell_switch{padding-top:6.5px;padding-bottom:6.5px}.weui-switch{-webkit-appearance:none;-moz-appearance:none;appearance:none}.weui-switch,.weui-switch-cp__box{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#dfdfdf;border:1px solid #dfdfdf;border-radius:16px;outline:0;width:52px;height:32px;-webkit-transition:background-color .1s,border .1s;transition:background-color .1s,border .1s;position:relative}.weui-switch:before,.weui-switch-cp__box:before{content:\" \";background-color:#fdfdfd;border-radius:15px;width:50px;height:30px;-webkit-transition:-webkit-transform .35s cubic-bezier(.45,1,.4,1);transition:-webkit-transform .35s cubic-bezier(.45,1,.4,1);transition:transform .35s cubic-bezier(.45,1,.4,1);transition:transform .35s cubic-bezier(.45,1,.4,1), -webkit-transform .35s cubic-bezier(.45,1,.4,1);position:absolute;top:0;left:0}.weui-switch:after,.weui-switch-cp__box:after{content:\" \";background-color:#fff;border-radius:15px;width:30px;height:30px;-webkit-transition:-webkit-transform .35s cubic-bezier(.4,.4,.25,1.35);transition:-webkit-transform .35s cubic-bezier(.4,.4,.25,1.35);transition:transform .35s cubic-bezier(.4,.4,.25,1.35);transition:transform .35s cubic-bezier(.4,.4,.25,1.35), -webkit-transform .35s cubic-bezier(.4,.4,.25,1.35);position:absolute;top:0;left:0;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.4);box-shadow:0 1px 3px rgba(0,0,0,.4)}.weui-switch:checked,.weui-switch-cp__input:checked~.weui-switch-cp__box{background-color:#04be02;border-color:#04be02}.weui-switch:checked:before,.weui-switch-cp__input:checked~.weui-switch-cp__box:before{-webkit-transform:scale(0);transform:scale(0)}.weui-switch:checked:after,.weui-switch-cp__input:checked~.weui-switch-cp__box:after{-webkit-transform:translate(20px);transform:translate(20px)}.weui-switch-cp__input{position:absolute;left:-9999px}.weui-switch-cp__box{display:block}taro-switch-core{width:52px;height:32px;display:inline-block}taro-switch-core .weui-switch{width:100%;height:100%;display:block}";

const Switch = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onChange = createEvent(this, "change", 7);
    this.switchChange = e => {
      e.stopPropagation();
      const value = e.target.checked;
      this.checked = value;
      this.onChange.emit({
        value
      });
    };
    this.type = 'switch';
    this.checked = false;
    this.color = '#04BE02';
    this.name = undefined;
    this.disabled = false;
    this.nativeProps = {};
    this.isWillLoadCalled = false;
  }
  function(newValue) {
    if (!this.isWillLoadCalled)
      return;
    if (this.inputRef.checked !== newValue) {
      this.inputRef.checked = newValue;
    }
  }
  componentWillLoad() {
    this.isWillLoadCalled = true;
  }
  componentDidLoad() {
    Object.defineProperty(this.el, 'value', {
      get: () => this.checked,
      configurable: true
    });
  }
  render() {
    const { type, color, checked, name, disabled, nativeProps } = this;
    const style = checked
      ? {
        borderColor: color || '04BE02',
        backgroundColor: color || '04BE02'
      }
      : {};
    return (h("input", Object.assign({ ref: input => {
        this.inputRef = input;
      }, type: 'checkbox', class: `weui-${type}`, style: style, checked: checked, name: name, disabled: disabled, onChange: this.switchChange }, nativeProps)));
  }
  get el() { return this; }
  static get watchers() { return {
    "checked": ["function"]
  }; }
  static get style() { return indexCss; }
}, [0, "taro-switch-core", {
    "type": [1],
    "checked": [1028],
    "color": [1],
    "name": [1],
    "disabled": [4],
    "nativeProps": [16],
    "isWillLoadCalled": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-switch-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-switch-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Switch);
      }
      break;
  } });
}

const TaroSwitchCore = Switch;
const defineCustomElement = defineCustomElement$1;

export { TaroSwitchCore, defineCustomElement };
