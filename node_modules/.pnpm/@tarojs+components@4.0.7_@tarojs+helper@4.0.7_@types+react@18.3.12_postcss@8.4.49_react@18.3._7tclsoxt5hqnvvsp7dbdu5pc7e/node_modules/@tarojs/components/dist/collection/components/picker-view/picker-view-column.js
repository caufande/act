import { h, Host } from '@stencil/core';
import { debounce } from '../../utils';
export class PickerViewColumn {
  constructor() {
    // 滚动结束自动回到合适的位置
    this.handleSelected = debounce(() => {
      const childList = this.el.childNodes;
      let sum = 0;
      let selectedIndex = '0';
      for (const index in childList) {
        const item = childList[index];
        const itemHeight = item.offsetHeight;
        if (sum + itemHeight / 2.0 > this.el.scrollTop) {
          selectedIndex = index;
          break;
        }
        sum += itemHeight;
      }
      this.el.scrollTo({
        top: sum,
        behavior: 'smooth'
      });
      this.onChange.emit({
        curIndex: this.col,
        selectedIndex: selectedIndex
      });
      this.onSelectEnd.emit();
    }, 500);
    this.col = undefined;
    this.initialPosition = '0';
    this.paddingVertical = 0;
    this.isInit = false;
  }
  onTouchStart() {
    this.onSelectStart.emit();
  }
  onTouchEnd() {
    this.handleSelected();
  }
  componentDidLoad() {
    this.handleChange();
  }
  componentDidUpdate() {
    this.handleChange();
  }
  handleChange() {
    const childList = this.el.childNodes;
    let idx = 0;
    let sum = 0;
    for (const index in childList) {
      const item = childList[index];
      if (this.initialPosition === index || !item || typeof item.offsetHeight !== 'number') {
        break;
      }
      sum += item.offsetHeight;
      idx++;
    }
    this.el.scrollTo({ top: sum });
    if (idx >= childList.length) {
      this.onChange.emit({
        curIndex: this.col,
        selectedIndex: idx - 1
      });
    }
  }
  render() {
    const { paddingVertical = 0 } = this;
    return (h(Host, { class: "taro-picker-view-column-container", style: { 'padding-top': `${paddingVertical}px`, 'padding-bottom': `${paddingVertical}px` } }));
  }
  static get is() { return "taro-picker-view-column-core"; }
  static get originalStyleUrls() {
    return {
      "$": ["./style/column.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["./style/column.css"]
    };
  }
  static get properties() {
    return {
      "col": {
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
        "attribute": "col",
        "reflect": false
      },
      "initialPosition": {
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
        "attribute": "initial-position",
        "reflect": false,
        "defaultValue": "'0'"
      },
      "paddingVertical": {
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
        "attribute": "padding-vertical",
        "reflect": false,
        "defaultValue": "0"
      }
    };
  }
  static get states() {
    return {
      "isInit": {}
    };
  }
  static get events() {
    return [{
        "method": "onChange",
        "name": "onselect",
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
        "method": "onSelectStart",
        "name": "onselectstart",
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
        "method": "onSelectEnd",
        "name": "onselectend",
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
        "name": "touchstart",
        "method": "onTouchStart",
        "target": undefined,
        "capture": false,
        "passive": true
      }, {
        "name": "touchend",
        "method": "onTouchEnd",
        "target": undefined,
        "capture": false,
        "passive": true
      }];
  }
}
