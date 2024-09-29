import { h } from '@stencil/core';
const LONG_TAP_DELAY = 500;
export class Canvas {
  constructor() {
    this.onTouchStart = () => {
      this.timer = setTimeout(() => {
        this.onLongTap.emit();
      }, LONG_TAP_DELAY);
    };
    this.onTouchMove = () => {
      clearTimeout(this.timer);
    };
    this.onTouchEnd = () => {
      clearTimeout(this.timer);
    };
    this.canvasId = undefined;
    this.height = undefined;
    this.width = undefined;
    this.nativeProps = {};
  }
  componentDidRender() {
    const [canvas] = this.el.children;
    if (!this.height || !this.width) {
      let style = window.getComputedStyle(canvas);
      this.height || (this.height = style.height);
      this.width || (this.width = style.width);
    }
    canvas.height = parseInt(this.height);
    canvas.width = parseInt(this.width);
  }
  render() {
    const { canvasId, nativeProps } = this;
    return (h("canvas", Object.assign({ "canvas-id": canvasId, style: {
        width: '100%',
        height: '100%'
      }, onTouchStart: this.onTouchStart, onTouchMove: this.onTouchMove, onTouchCancel: this.onTouchEnd, onTouchEnd: this.onTouchEnd }, nativeProps)));
  }
  static get is() { return "taro-canvas-core"; }
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
      "canvasId": {
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
        "attribute": "id",
        "reflect": false
      },
      "height": {
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
        "attribute": "height",
        "reflect": true
      },
      "width": {
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
        "attribute": "width",
        "reflect": true
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
        "method": "onLongTap",
        "name": "longtap",
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
}
