import { h } from '@stencil/core';
function getTrueType(type, confirmType, password) {
  if (confirmType === 'search')
    type = 'search';
  if (password)
    type = 'password';
  if (typeof type === 'undefined') {
    return 'text';
  }
  if (!type) {
    throw new Error('unexpected type');
  }
  if (type === 'digit')
    type = 'number';
  return type;
}
function fixControlledValue(value) {
  return value !== null && value !== void 0 ? value : '';
}
export class Input {
  constructor() {
    this.isOnComposition = false;
    this.isOnPaste = false;
    this.onInputExcuted = false;
    this.handleInput = (e) => {
      e.stopPropagation();
      const { type, maxlength, confirmType, password } = this;
      if (!this.isOnComposition && !this.onInputExcuted) {
        let value = e.target.value;
        const inputType = getTrueType(type, confirmType, password);
        this.onInputExcuted = true;
        /* 修复 number 类型 maxlength 无效 */
        if (inputType === 'number' && value && maxlength > -1 && maxlength <= value.length) {
          value = value.substring(0, maxlength);
          e.target.value = value;
        }
        // 修复 IOS 光标跳转问题
        // if (!(['number', 'file'].indexOf(inputType) >= 0)) {
        //   const pos = e.target.selectionEnd
        //   setTimeout(
        //     () => {
        //       e.target.selectionStart = pos
        //       e.target.selectionEnd = pos
        //     }
        //   )
        // }
        this.value = value;
        this.onInput.emit({
          value,
          cursor: value.length
        });
        this.onInputExcuted = false;
      }
    };
    this.handlePaste = (e) => {
      e.stopPropagation();
      this.isOnPaste = true;
      this.onPaste.emit({
        value: e.target.value
      });
    };
    this.handleFocus = (e) => {
      e.stopPropagation();
      this.onInputExcuted = false;
      this.onFocus.emit({
        value: e.target.value
      });
    };
    this.handleBlur = (e) => {
      e.stopPropagation();
      this.onBlur.emit({
        value: e.target.value
      });
    };
    this.handleChange = (e) => {
      e.stopPropagation();
      this.onChange.emit({
        value: e.target.value
      });
      if (this.isOnPaste) {
        this.isOnPaste = false;
        this.value = e.target.value;
        this.onInput.emit({
          value: e.target.value,
          cursor: e.target.value.length
        });
      }
    };
    this.handleKeyDown = (e) => {
      e.stopPropagation();
      const { value } = e.target;
      const keyCode = e.keyCode || e.code;
      this.onInputExcuted = false;
      this.onKeyDown.emit({
        value,
        cursor: value.length,
        keyCode
      });
      keyCode === 13 && this.onConfirm.emit({ value });
    };
    this.handleComposition = (e) => {
      e.stopPropagation();
      if (!(e.target instanceof HTMLInputElement))
        return;
      if (e.type === 'compositionend') {
        this.isOnComposition = false;
        this.value = e.target.value;
        this.onInput.emit({
          value: e.target.value,
          cursor: e.target.value.length
        });
      }
      else {
        this.isOnComposition = true;
      }
    };
    this.handleBeforeInput = (e) => {
      if (!e.data)
        return;
      const isNumber = e.data && /[0-9]/.test(e.data);
      if (this.type === 'number' && !isNumber) {
        e.preventDefault();
      }
      if (this.type === 'digit' && !isNumber) {
        if (e.data !== '.' || (e.data === '.' && e.target.value.indexOf('.') > -1)) {
          e.preventDefault();
        }
      }
    };
    this.value = '';
    this.type = undefined;
    this.password = false;
    this.placeholder = undefined;
    this.disabled = false;
    this.maxlength = 140;
    this.autoFocus = false;
    this.confirmType = 'done';
    this.name = undefined;
    this.nativeProps = {};
  }
  async focus() {
    this.inputRef.focus();
  }
  watchAutoFocus(newValue, oldValue) {
    var _a;
    if (!oldValue && newValue) {
      (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.focus();
    }
  }
  watchValue(newValue) {
    const value = fixControlledValue(newValue);
    if (this.inputRef.value !== value) {
      this.inputRef.value = value;
    }
  }
  componentDidLoad() {
    var _a, _b, _c, _d, _e;
    if (this.type === 'file') {
      this.fileListener = () => {
        this.onInput.emit();
      };
      (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.fileListener);
    }
    else {
      (_b = this.inputRef) === null || _b === void 0 ? void 0 : _b.addEventListener('compositionstart', this.handleComposition);
      (_c = this.inputRef) === null || _c === void 0 ? void 0 : _c.addEventListener('compositionend', this.handleComposition);
      (_d = this.inputRef) === null || _d === void 0 ? void 0 : _d.addEventListener('beforeinput', this.handleBeforeInput);
      (_e = this.inputRef) === null || _e === void 0 ? void 0 : _e.addEventListener('textInput', this.handleBeforeInput);
    }
  }
  disconnectedCallback() {
    var _a, _b, _c, _d, _e;
    if (this.type === 'file') {
      (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.removeEventListener('change', this.fileListener);
    }
    else {
      (_b = this.inputRef) === null || _b === void 0 ? void 0 : _b.removeEventListener('compositionstart', this.handleComposition);
      (_c = this.inputRef) === null || _c === void 0 ? void 0 : _c.removeEventListener('compositionend', this.handleComposition);
      (_d = this.inputRef) === null || _d === void 0 ? void 0 : _d.removeEventListener('beforeinput', this.handleBeforeInput);
      (_e = this.inputRef) === null || _e === void 0 ? void 0 : _e.removeEventListener('textInput', this.handleBeforeInput);
    }
  }
  render() {
    const { value, type, password, placeholder, autoFocus, disabled, maxlength, confirmType, name, nativeProps } = this;
    return (h("input", Object.assign({ ref: input => {
        this.inputRef = input;
        if (autoFocus && input)
          input.focus();
      }, class: 'weui-input', type: getTrueType(type, confirmType, password), placeholder: placeholder, autoFocus: autoFocus, disabled: disabled, maxlength: maxlength, name: name, onInput: this.handleInput, onFocus: this.handleFocus, onBlur: this.handleBlur, onChange: this.handleChange, onKeyDown: this.handleKeyDown, onPaste: this.handlePaste, onCompositionStart: this.handleComposition, onCompositionEnd: this.handleComposition }, nativeProps, { value: fixControlledValue(value) })));
  }
  static get is() { return "taro-input-core"; }
  static get originalStyleUrls() {
    return {
      "$": ["./style/index.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["./style/index.css"]
    };
  }
  static get properties() {
    return {
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "value",
        "reflect": false,
        "defaultValue": "''"
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "type",
        "reflect": false
      },
      "password": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "password",
        "reflect": false,
        "defaultValue": "false"
      },
      "placeholder": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "placeholder",
        "reflect": false
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "maxlength": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "maxlength",
        "reflect": false,
        "defaultValue": "140"
      },
      "autoFocus": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "focus",
        "reflect": false,
        "defaultValue": "false"
      },
      "confirmType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "confirm-type",
        "reflect": false,
        "defaultValue": "'done'"
      },
      "name": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
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
      },
      "nativeProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "{}",
          "resolved": "{}",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "{}"
      }
    };
  }
  static get events() {
    return [{
        "method": "onInput",
        "name": "input",
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
      }, {
        "method": "onPaste",
        "name": "paste",
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
      }, {
        "method": "onFocus",
        "name": "focus",
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
      }, {
        "method": "onBlur",
        "name": "blur",
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
      }, {
        "method": "onConfirm",
        "name": "confirm",
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
      }, {
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
      }, {
        "method": "onKeyDown",
        "name": "keydown",
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
  static get methods() {
    return {
      "focus": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "autoFocus",
        "methodName": "watchAutoFocus"
      }, {
        "propName": "value",
        "methodName": "watchValue"
      }];
  }
}
