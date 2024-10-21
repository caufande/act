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
var _CheckboxGroup_value;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h, Host } from '@stencil/core';
export class CheckboxGroup {
  constructor() {
    this.uniqueName = Date.now().toString(36);
    _CheckboxGroup_value.set(this, void 0);
    this.name = undefined;
  }
  function(e) {
    e.stopPropagation();
    if (e.target.tagName !== 'TARO-CHECKBOX-CORE')
      return;
    const childList = this.el.querySelectorAll('taro-checkbox-core');
    __classPrivateFieldSet(this, _CheckboxGroup_value, this.getValues(childList), "f");
    this.onChange.emit({
      value: __classPrivateFieldGet(this, _CheckboxGroup_value, "f")
    });
  }
  componentDidLoad() {
    const childList = this.el.querySelectorAll('taro-checkbox-core');
    childList.forEach((element) => {
      element.setAttribute('name', this.name || this.uniqueName);
    });
    Object.defineProperty(this.el, 'value', {
      get: () => {
        if (!__classPrivateFieldGet(this, _CheckboxGroup_value, "f")) {
          const childList = this.el.querySelectorAll('taro-checkbox-core');
          __classPrivateFieldSet(this, _CheckboxGroup_value, this.getValues(childList), "f");
        }
        return __classPrivateFieldGet(this, _CheckboxGroup_value, "f");
      },
      configurable: true
    });
  }
  getValues(childList) {
    return Array.from(childList)
      .filter(element => {
      const checkbox = element.querySelector('input');
      return checkbox === null || checkbox === void 0 ? void 0 : checkbox.checked;
    })
      .map(element => element.value);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-checkbox-group-core"; }
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
        "name": "checkboxchange",
        "method": "function",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
_CheckboxGroup_value = new WeakMap();
