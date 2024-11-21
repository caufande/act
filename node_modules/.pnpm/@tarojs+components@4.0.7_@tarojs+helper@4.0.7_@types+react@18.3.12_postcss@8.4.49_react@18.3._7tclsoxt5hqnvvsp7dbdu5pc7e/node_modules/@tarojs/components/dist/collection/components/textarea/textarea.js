import { h } from '@stencil/core';
function fixControlledValue(value) {
  return value !== null && value !== void 0 ? value : '';
}
export class Textarea {
  constructor() {
    this.handleInput = (e) => {
      e.stopPropagation();
      this.handleLineChange();
      const value = e.target.value || '';
      this.value = value;
      this.onInput.emit({
        value,
        cursor: value.length
      });
    };
    this.handleFocus = (e) => {
      e.stopPropagation();
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
    };
    this.handleLineChange = () => {
      const line = this.getNumberOfLines();
      if (line !== this.line) {
        this.line = line;
        this.onLineChange.emit({
          height: this.textareaRef.clientHeight,
          lineCount: this.line
        });
      }
    };
    this.handleKeyDown = (e) => {
      e.stopPropagation();
      const { value } = e.target;
      const keyCode = e.keyCode || e.code;
      this.onKeyDown.emit({
        value,
        cursor: value.length,
        keyCode
      });
      keyCode === 13 && this.onConfirm.emit({ value });
    };
    this.calculateContentHeight = (ta, scanAmount) => {
      let origHeight = ta.style.height, height = ta.offsetHeight, scrollHeight = ta.scrollHeight, overflow = ta.style.overflow, originMinHeight = ta.style.minHeight || null;
      /// only bother if the ta is bigger than content
      if (height >= scrollHeight) {
        ta.style.minHeight = 0;
        /// check that our browser supports changing dimension
        /// calculations mid-way through a function call...
        ta.style.height = height + scanAmount + 'px';
        /// because the scrollbar can cause calculation problems
        ta.style.overflow = 'hidden';
        /// by checking that scrollHeight has updated
        if (scrollHeight < ta.scrollHeight) {
          /// now try and scan the ta's height downwards
          /// until scrollHeight becomes larger than height
          while (ta.offsetHeight >= ta.scrollHeight) {
            ta.style.height = (height -= scanAmount) + 'px';
          }
          /// be more specific to get the exact height
          while (ta.offsetHeight < ta.scrollHeight) {
            ta.style.height = height++ + 'px';
          }
          /// reset the ta back to it's original height
          ta.style.height = origHeight;
          /// put the overflow back
          ta.style.overflow = overflow;
          ta.style.minHeight = originMinHeight;
          return height;
        }
      }
      else {
        return scrollHeight;
      }
    };
    this.getNumberOfLines = () => {
      const ta = this.textareaRef, style = window.getComputedStyle ? window.getComputedStyle(ta) : ta.style, 
      // This will get the line-height only if it is set in the css,
      // otherwise it's "normal"
      taLineHeight = parseInt(style.lineHeight, 10), 
      // Get the scroll height of the textarea
      taHeight = this.calculateContentHeight(ta, taLineHeight), 
      // calculate the number of lines
      numberOfLines = Math.floor(taHeight / taLineHeight);
      return numberOfLines;
    };
    this.value = '';
    this.placeholder = undefined;
    this.disabled = false;
    this.maxlength = 140;
    this.autoFocus = false;
    this.autoHeight = false;
    this.name = undefined;
    this.nativeProps = {};
    this.line = 1;
  }
  watchAutoFocus(newValue, oldValue) {
    var _a;
    if (!oldValue && newValue) {
      (_a = this.textareaRef) === null || _a === void 0 ? void 0 : _a.focus();
    }
  }
  watchValue(newValue) {
    // hack: 在事件回调中，props.value 变化不知为何不会触发 Stencil 更新，因此这里手动更新一下
    const value = fixControlledValue(newValue);
    if (this.textareaRef.value !== value) {
      this.textareaRef.value = value;
    }
  }
  async focus() {
    this.textareaRef.focus();
  }
  render() {
    const { value, placeholder, disabled, maxlength, autoFocus, autoHeight, name, nativeProps, handleInput, handleFocus, handleBlur, handleChange } = this;
    const otherProps = {};
    if (autoHeight) {
      otherProps.rows = this.line;
    }
    return (h("textarea", Object.assign({ ref: input => {
        if (input) {
          this.textareaRef = input;
          if (autoFocus && input)
            input.focus();
        }
      }, class: `taro-textarea ${autoHeight ? 'auto-height' : ''}`, value: fixControlledValue(value), placeholder: placeholder, name: name, disabled: disabled, maxlength: maxlength, autofocus: autoFocus, onInput: handleInput, onFocus: handleFocus, onBlur: handleBlur, onChange: handleChange, onKeyDown: this.handleKeyDown }, nativeProps, otherProps)));
  }
  static get is() { return "taro-textarea-core"; }
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
      "autoHeight": {
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
        "attribute": "auto-height",
        "reflect": false,
        "defaultValue": "false"
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
  static get states() {
    return {
      "line": {}
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
        "method": "onLineChange",
        "name": "linechange",
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
