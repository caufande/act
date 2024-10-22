import { h } from '@stencil/core';
export class Switch {
  constructor() {
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
  static get is() { return "taro-switch-core"; }
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
        "reflect": false,
        "defaultValue": "'switch'"
      },
      "checked": {
        "type": "boolean",
        "mutable": true,
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
        "attribute": "checked",
        "reflect": false,
        "defaultValue": "false"
      },
      "color": {
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
        "attribute": "color",
        "reflect": false,
        "defaultValue": "'#04BE02'"
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
      "isWillLoadCalled": {}
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
  static get watchers() {
    return [{
        "propName": "checked",
        "methodName": "function"
      }];
  }
}
