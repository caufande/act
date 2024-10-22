import { h, Host } from '@stencil/core';
export class Text {
  constructor() {
    this.selectable = false;
    this.userSelect = false;
    this.space = undefined;
    this.numberOfLines = undefined;
  }
  render() {
    const style = {};
    if (typeof this.numberOfLines === 'number') {
      style['--line-clamp'] = this.numberOfLines;
    }
    return (h(Host, { style: style }, h("slot", null)));
  }
  static get is() { return "taro-text-core"; }
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
      "selectable": {
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
        "attribute": "selectable",
        "reflect": false,
        "defaultValue": "false"
      },
      "userSelect": {
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
        "attribute": "user-select",
        "reflect": false,
        "defaultValue": "false"
      },
      "space": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "keyof TextProps.TSpace",
          "resolved": "\"emsp\" | \"ensp\" | \"nbsp\" | undefined",
          "references": {
            "TextProps": {
              "location": "import",
              "path": "types"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "space",
        "reflect": false
      },
      "numberOfLines": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "number-of-lines",
        "reflect": false
      }
    };
  }
}
