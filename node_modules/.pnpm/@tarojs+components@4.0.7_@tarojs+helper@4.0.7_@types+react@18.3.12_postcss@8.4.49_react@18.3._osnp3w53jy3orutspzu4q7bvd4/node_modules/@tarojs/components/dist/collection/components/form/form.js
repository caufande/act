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
var _Form_value;
import { h } from '@stencil/core';
export class Form {
  constructor() {
    _Form_value.set(this, {});
  }
  onButtonSubmit(e) {
    e.stopPropagation();
    __classPrivateFieldSet(this, _Form_value, this.getFormValue(), "f");
    this.onSubmit.emit({
      value: __classPrivateFieldGet(this, _Form_value, "f")
    });
  }
  onButtonReset(e) {
    e.stopPropagation();
    this.form.reset();
  }
  componentDidLoad() {
    __classPrivateFieldSet(this, _Form_value, this.getFormValue(), "f");
    Object.defineProperty(this.el, 'value', {
      get: () => __classPrivateFieldGet(this, _Form_value, "f"),
      configurable: true
    });
  }
  componentDidRender() {
    if (!this.originalAppendChild) {
      this.originalAppendChild = this.el.appendChild;
      this.originalInsertBefore = this.el.insertBefore;
      this.originalReplaceChild = this.el.replaceChild;
      this.originalRemoveChild = this.el.removeChild;
    }
    if (!this.form) {
      this.el.appendChild = this.originalAppendChild;
      this.el.insertBefore = this.originalInsertBefore;
      this.el.replaceChild = this.originalReplaceChild;
      this.el.removeChild = this.originalRemoveChild;
      return;
    }
    this.el.appendChild = (newChild) => {
      return this.form.appendChild(newChild);
    };
    this.el.insertBefore = (newChild, refChild) => {
      return this.form.insertBefore(newChild, refChild);
    };
    this.el.replaceChild = (newChild, oldChild) => {
      return this.form.replaceChild(newChild, oldChild);
    };
    this.el.removeChild = (oldChild) => {
      return this.form.removeChild(oldChild);
    };
  }
  getFormValue() {
    const el = this.el;
    const elements = [];
    const tagElements = el.getElementsByTagName('input');
    for (let j = 0; j < tagElements.length; j++) {
      elements.push(tagElements[j]);
    }
    const formItem = {};
    const hash = {};
    elements.forEach(item => {
      if (typeof item.name !== 'string')
        return;
      if (item.className.indexOf('weui-switch') !== -1) {
        formItem[item.name] = item.checked;
        return;
      }
      if (item.type === 'radio') {
        if (item.checked) {
          hash[item.name] = true;
          formItem[item.name] = item.value;
        }
        else {
          if (!hash[item.name]) {
            formItem[item.name] = '';
          }
        }
        return;
      }
      if (item.type === 'checkbox') {
        if (item.checked) {
          if (hash[item.name]) {
            formItem[item.name].push(item.value);
          }
          else {
            hash[item.name] = true;
            formItem[item.name] = [item.value];
          }
        }
        else {
          if (!hash[item.name]) {
            formItem[item.name] = [];
          }
        }
        return;
      }
      formItem[item.name] = item.value;
    });
    const textareaElements = el.getElementsByTagName('textarea');
    const textareaEleArr = [];
    for (let i = 0; i < textareaElements.length; i++) {
      textareaEleArr.push(textareaElements[i]);
    }
    textareaEleArr.forEach(v => {
      if (typeof v.name !== 'string')
        return;
      formItem[v.name] = v.value;
    });
    return formItem;
  }
  render() {
    return (h("form", { ref: dom => {
        this.form = dom;
      } }, h("slot", null)));
  }
  static get is() { return "taro-form-core"; }
  static get events() {
    return [{
        "method": "onSubmit",
        "name": "submit",
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
        "name": "tarobuttonsubmit",
        "method": "onButtonSubmit",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "tarobuttonreset",
        "method": "onButtonReset",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
_Form_value = new WeakMap();
