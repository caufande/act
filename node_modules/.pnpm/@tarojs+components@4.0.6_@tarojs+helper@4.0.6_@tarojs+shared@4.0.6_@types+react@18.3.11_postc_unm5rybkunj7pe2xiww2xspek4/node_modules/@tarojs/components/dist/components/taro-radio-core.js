import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';

const Radio = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onChange = createEvent(this, "radiochange", 7);
    this.handleClick = (e) => {
      e.stopPropagation();
      if (this.disabled)
        return;
      if (!this.checked)
        this.checked = true;
    };
    this.name = undefined;
    this.value = '';
    this.id = undefined;
    this.checked = false;
    this.disabled = false;
    this.nativeProps = {};
    this.isWillLoadCalled = false;
  }
  watchChecked(newVal) {
    if (!this.isWillLoadCalled)
      return;
    newVal && this.onChange.emit({ value: this.value });
  }
  watchId(newVal) {
    if (!this.isWillLoadCalled)
      return;
    if (newVal)
      this.inputEl.setAttribute('id', newVal);
  }
  componentDidRender() {
    this.id && this.el.removeAttribute('id');
  }
  componentWillLoad() {
    this.isWillLoadCalled = true;
  }
  render() {
    const { checked, name, value, disabled, nativeProps } = this;
    return (h(Host, { className: 'weui-cells_checkbox', onClick: this.handleClick }, h("input", Object.assign({ ref: dom => {
        if (!dom)
          return;
        this.inputEl = dom;
        if (this.id)
          dom.setAttribute('id', this.id);
      }, type: 'radio', name: name, value: value, class: 'weui-check', checked: checked, disabled: disabled, onChange: e => e.stopPropagation() }, nativeProps)), h("i", { class: 'weui-icon-checked' }), h("slot", null)));
  }
  get el() { return this; }
  static get watchers() { return {
    "checked": ["watchChecked"],
    "id": ["watchId"]
  }; }
}, [4, "taro-radio-core", {
    "name": [1],
    "value": [1],
    "id": [1025],
    "checked": [1540],
    "disabled": [4],
    "nativeProps": [16],
    "isWillLoadCalled": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["taro-radio-core"];
  components.forEach(tagName => { switch (tagName) {
    case "taro-radio-core":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Radio);
      }
      break;
  } });
}

const TaroRadioCore = Radio;
const defineCustomElement = defineCustomElement$1;

export { TaroRadioCore, defineCustomElement };
