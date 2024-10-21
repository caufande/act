import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';

const indexCss = "page,body{--weui-cellMarginLR:16px;--weui-cellPaddingLR:16px}.weui-cells__group{border:0}.weui-cells__group:first-child{margin-top:0}.weui-cells__group_form{margin-top:24px}.weui-cells__group_form .weui-cells{margin-left:var(--weui-cellMarginLR);margin-right:var(--weui-cellMarginLR)}.weui-cells__group_form .weui-cells:before,.weui-cells__group_form .weui-cells:after{left:var(--weui-cellPaddingLR);right:var(--weui-cellPaddingLR)}.weui-cells__group_form .weui-cell{padding:16px var(--weui-cellPaddingLR)}.weui-cells__group_form .weui-cell:before{left:var(--weui-cellPaddingLR);right:var(--weui-cellPaddingLR)}.weui-cells__group_form .weui-cell:not(.weui-cell_vertical) .weui-cell__hd{padding-right:16px}.weui-cells__group_form .weui-cell:not(.weui-cell_vertical) .weui-cell__ft{padding-left:16px}.weui-cells__group_form .weui-cells__title{margin-top:24px;margin-bottom:8px;padding:0 32px}.weui-cells__group_form:first-child .weui-cells__title{margin-top:0}.weui-cells__group_form .weui-cells__tips{padding:0 calc(var(--weui-cellMarginLR) + var(--weui-cellPaddingLR));color:var(--weui-FG-2);margin-top:8px}.weui-cells__group_form .weui-cells__tips a{font-weight:700}.weui-cells__group_form .weui-cells__tips_warn{color:var(--weui-RED)}.weui-cells__group_form .weui-label{max-width:5em;margin-right:8px}.weui-cells__group_form .weui-cell_access:active:after,.weui-cells__group_form .weui-cell_active:active:after{border-radius:8px}.weui-cells__group_form .weui-cell_warn input{color:#e64340}.weui-cells__group_form .weui-icon-warn,.weui-cells__group_form .weui-cell_switch:active:after,.weui-cells__group_form .weui-cell_vcode:active:after,.weui-cells__group_form .weui-cell_readonly:active:after,.weui-cells__group_form .weui-cell_disabled:active:after{display:none}.weui-cells__group_form input,.weui-cells__group_form textarea,.weui-cells__group_form label[for]{-webkit-tap-highlight-color:transparent}.weui-cells__group_form .weui-cell_wrap{-ms-flex-align:initial;align-items:initial;padding-top:8px;padding-bottom:8px}.weui-cells__group_form .weui-cell_wrap .weui-cell__hd{padding-right:0}.weui-cells__group_form .weui-cell_wrap .weui-label{margin-top:8px}.weui-cells__group_form .weui-cell_wrap .weui-cell__bd{-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}.weui-cells__group_form .weui-cell__control{margin:8px 0 8px 16px}.weui-cells__group_form .weui-cell__control_flex{-ms-flex:1;flex:1;min-width:30vw}.weui-cells__group_form .weui-vcode-btn{color:#000;background-color:#f8f8f8;border-radius:6px;width:auto;height:auto;padding:0 12px;font-size:16px;line-height:2}.weui-cells__group_form .weui-vcode-btn:before{display:none}.weui-cells__group_form .weui-cell_vcode.weui-cell_wrap{padding-top:4px;padding-bottom:4px}.weui-cells__group_form .weui-cell_vcode.weui-cell_wrap .weui-label{margin-top:12px}.weui-cells__group_form .weui-cell_vcode.weui-cell_wrap .weui-input{min-height:1.88235em;font-size:17px}.weui-cells__group_form .weui-cells_checkbox .weui-check__label:before{left:calc(40px + var(--weui-cellPaddingLR))}.weui-cells__group_form .weui-cell_select{padding:0}.weui-cells__group_form .weui-cell_select-before .weui-cell__hd{padding-right:0}.weui-cells__group_form .weui-cell_switch{padding:12px 16px}.weui-cells__group_form-primary{margin-top:32px}.weui-cells__group_form-primary .weui-cells{background:var(--weui-BG-1);border-radius:8px;overflow:hidden}.weui-cells__group_form-primary .weui-cells:before,.weui-cells__group_form-primary .weui-cells:after{display:none}.weui-cells__group_form-primary .weui-cell_access:active:after,.weui-cells__group_form-primary .weui-cell_active:active:after{border-radius:0}.taro-checkbox{display:inline-block;position:relative}.taro-checkbox_checked{-webkit-appearance:none;-moz-appearance:none;appearance:none;vertical-align:0;color:#1aad19;background-color:#fff;border:1px solid #d1d1d1;border-radius:3px;outline:0;width:23px;height:23px;min-height:0;font-size:23px;display:inline-block;position:relative;top:5px}.taro-checkbox_checked:checked:before{vertical-align:middle;text-decoration:inherit;text-align:center;text-transform:none;font-variant:normal;font-family:weui;font-style:normal;font-weight:400;font-size:inherit;color:inherit;content:\"\";speak:none;display:inline-block;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-48%)scale(.73);transform:translate(-50%,-48%)scale(.73)}";

const Checkbox = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onChange = createEvent(this, "checkboxchange", 7);
    this.handleChange = (e) => {
      e.stopPropagation();
      this.onChange.emit({
        value: this.value
      });
    };
    this.name = undefined;
    this.value = '';
    this.color = undefined;
    this.id = undefined;
    this.checked = false;
    this.disabled = false;
    this.nativeProps = {};
    this.isWillLoadCalled = false;
  }
  watchId(newVal) {
    if (!this.isWillLoadCalled)
      return;
    if (newVal)
      this.inputEl.setAttribute('id', newVal);
  }
  componentWillLoad() {
    this.isWillLoadCalled = true;
  }
  componentDidRender() {
    this.id && this.el.removeAttribute('id');
  }
  render() {
    const { checked, name, color, value, disabled, nativeProps } = this;
    return (h(Host, { className: 'weui-cells_checkbox' }, h("input", Object.assign({ ref: dom => {
        if (!dom)
          return;
        this.inputEl = dom;
        if (this.id)
          dom.setAttribute('id', this.id);
      }, type: 'checkbox', value: value, name: name, class: 'taro-checkbox_checked', style: { color }, checked: checked, disabled: disabled, onChange: this.handleChange }, nativeProps)), h("slot", null)));
  }
  get el() { return this; }
  static get watchers() { return {
    "id": ["watchId"]
  }; }
  static get style() { return indexCss; }
}, [4, "taro-checkbox-core", {
    "name": [1],
    "value": [1032],
    "color": [1],
    "id": [1025],
    "checked": [4],
    "disabled": [4],
    "nativeProps": [16],
    "isWillLoadCalled": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-checkbox-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-checkbox-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Checkbox);
      }
      break;
  } });
}

const TaroCheckboxCore = Checkbox;
const defineCustomElement = defineCustomElement$1;

export { TaroCheckboxCore, defineCustomElement };
