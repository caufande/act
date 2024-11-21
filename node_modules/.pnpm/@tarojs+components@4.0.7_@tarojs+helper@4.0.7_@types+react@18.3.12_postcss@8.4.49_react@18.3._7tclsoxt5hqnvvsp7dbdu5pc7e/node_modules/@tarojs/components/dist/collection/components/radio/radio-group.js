var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RadioGroup_value;
import { h, Host } from '@stencil/core';
export class RadioGroup {
  constructor() {
    this.uniqueName = Date.now().toString(36);
    _RadioGroup_value.set(this, void 0);
    this.name = undefined;
  }
  function(e) {
    e.stopPropagation();
    if (e.target.tagName !== 'TARO-RADIO-CORE')
      return;
    const target = e.target;
    if (target.checked) {
      const childList = this.el.querySelectorAll('taro-radio-core');
      childList.forEach(element => {
        if (element !== target) {
          element.checked = false;
        }
      });
      __classPrivateFieldSet(this, _RadioGroup_value, e.detail.value, "f");
      this.onChange.emit({
        value: __classPrivateFieldGet(this, _RadioGroup_value, "f")
      });
    }
  }
  componentDidLoad() {
    const childList = this.el.querySelectorAll('taro-radio-core');
    childList.forEach((element) => {
      element.setAttribute('name', this.name || this.uniqueName);
    });
    Object.defineProperty(this.el, 'value', {
      get: () => {
        if (!__classPrivateFieldGet(this, _RadioGroup_value, "f")) {
          const childList = this.el.querySelectorAll('taro-radio-core');
          __classPrivateFieldSet(this, _RadioGroup_value, this.getValues(childList), "f");
        }
        return __classPrivateFieldGet(this, _RadioGroup_value, "f");
      },
      configurable: true
    });
  }
  getValues(childList) {
    let val = '';
    Array.from(childList)
      .forEach(element => {
      const checkbox = element.querySelector('input');
      if (checkbox === null || checkbox === void 0 ? void 0 : checkbox.checked) {
        val = checkbox.value || '';
      }
    });
    return val;
  }
  render() {
    return (h(Host, { class: 'weui-cells_radiogroup' }));
  }
  static get is() { return "taro-radio-group-core"; }
  static get properties() {
    return {
      "name": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "name",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "onChange",
        "name": "change",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "el"; }
  static get listeners() {
    return [{
        "name": "radiochange",
        "method": "function",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
_RadioGroup_value = new WeakMap();
