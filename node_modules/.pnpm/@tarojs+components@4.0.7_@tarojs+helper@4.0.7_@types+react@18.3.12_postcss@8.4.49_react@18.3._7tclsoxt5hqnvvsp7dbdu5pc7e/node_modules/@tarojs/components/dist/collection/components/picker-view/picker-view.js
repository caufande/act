import { h, Host } from '@stencil/core';
import classNames from 'classnames';
import { convertStyle } from '../../utils';
export class PickerView {
  constructor() {
    this.indicatorStyle = undefined;
    this.indicatorClass = undefined;
    this.value = undefined;
    this.maskStyle = undefined;
    this.maskClass = undefined;
  }
  onPropsChange() {
    this.handleValueChange();
  }
  onSelect(e) {
    e.stopPropagation();
    if (e.target.tagName !== 'TARO-PICKER-VIEW-COLUMN-CORE')
      return;
    let _curIndex = +e.detail.curIndex;
    let _selectedIndex = +e.detail.selectedIndex;
    this.value[_curIndex] = _selectedIndex;
    this.onChange.emit({ value: this.value });
  }
  onSelectStart(e) {
    e.stopPropagation();
    if (e.target.tagName !== 'TARO-PICKER-VIEW-COLUMN-CORE')
      return;
    this.onPickStart.emit();
  }
  onPickerColEnd(e) {
    e.stopPropagation();
    if (e.target.tagName !== 'TARO-PICKER-VIEW-COLUMN-CORE')
      return;
    this.onPickEnd.emit();
  }
  componentDidLoad() {
    this.handleValueChange();
  }
  handleValueChange() {
    const childList = this.el.querySelectorAll('taro-picker-view-column-core');
    childList.forEach((element, index) => {
      var _a;
      element.setAttribute('col', `${index}`);
      let selectIndex = 0;
      if (!!this.value && this.value.length > index) {
        selectIndex = this.value[index];
      }
      const pickerHeight = this.el.getBoundingClientRect().height;
      const indicatorHeight = ((_a = this.indicator) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0;
      const paddingVertical = (pickerHeight - indicatorHeight) / 2.0;
      element.setAttribute('initial-position', `${selectIndex}`);
      element.setAttribute('padding-vertical', `${paddingVertical}`);
    });
  }
  // 过滤非 PickerViewColumn 组件
  componentDidRender() {
    this.el.childNodes.forEach(item => {
      const childEle = item;
      if ('TARO-PICKER-VIEW-COLUMN-CORE' !== childEle.tagName &&
        childEle.className !== 'taro-picker-view-mask-container') {
        this.el.removeChild(item);
      }
    });
  }
  render() {
    const indicatorCls = classNames('taro-picker-view-mask-indicator', this.indicatorClass);
    const maskTopCls = classNames('taro-picker-view-mask-top', this.maskClass);
    const maskBtmCls = classNames('taro-picker-view-mask-bottom', this.maskClass);
    const indicatorStyle = convertStyle(this.indicatorStyle);
    const maskTopStyle = convertStyle(this.maskStyle);
    const maskBottomStyle = convertStyle(this.maskStyle);
    return (h(Host, { class: "taro-picker-view-container" }, h("slot", null), h("div", { class: "taro-picker-view-mask-container" }, h("div", { class: maskTopCls, style: maskTopStyle }), h("div", { class: indicatorCls, style: indicatorStyle, ref: indicator => (this.indicator = indicator) }), h("div", { class: maskBtmCls, style: maskBottomStyle }))));
  }
  static get is() { return "taro-picker-view-core"; }
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
      "indicatorStyle": {
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
        "attribute": "indicator-style",
        "reflect": false
      },
      "indicatorClass": {
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
        "attribute": "indicator-class",
        "reflect": false
      },
      "value": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "number[]",
          "resolved": "number[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "maskStyle": {
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
        "attribute": "mask-style",
        "reflect": false
      },
      "maskClass": {
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
        "attribute": "mask-class",
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
      }, {
        "method": "onPickStart",
        "name": "pickstart",
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
        "method": "onPickEnd",
        "name": "pickend",
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
        "propName": "value",
        "methodName": "onPropsChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "onselect",
        "method": "onSelect",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "onselectstart",
        "method": "onSelectStart",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "onselectend",
        "method": "onPickerColEnd",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
