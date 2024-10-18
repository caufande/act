import { h } from '@stencil/core';
export class Label {
  constructor() {
    this.for = undefined;
  }
  render() {
    return (h("label", { htmlFor: this.for }, h("slot", null)));
  }
  static get is() { return "taro-label-core"; }
  static get properties() {
    return {
      "for": {
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
        "attribute": "for",
        "reflect": false
      }
    };
  }
}
