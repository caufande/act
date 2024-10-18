import { h, Host } from '@stencil/core';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
/**
 * TODO: 参数还需要进一步细化对齐
 * Navigator组件
 * https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html
 **/
export class Navigator {
  constructor() {
    this.hoverClass = undefined;
    this.url = undefined;
    this.openType = 'navigate';
    this.isHover = false;
    this.delta = 0;
  }
  onClick() {
    const { openType, onSuccess, onFail, onComplete } = this;
    let promise = Promise.resolve();
    switch (openType) {
      case 'navigate':
        promise = Taro.navigateTo({
          url: this.url
        });
        break;
      case 'redirect':
        promise = Taro.redirectTo({
          url: this.url
        });
        break;
      case 'switchTab':
        promise = Taro.switchTab({
          url: this.url
        });
        break;
      case 'reLaunch':
        promise = Taro.reLaunch({
          url: this.url
        });
        break;
      case 'navigateBack':
        promise = Taro.navigateBack({
          delta: this.delta
        });
        break;
      case 'exit':
        promise = Promise.reject(new Error('navigator:fail 暂不支持"openType: exit"'));
        break;
    }
    if (promise) {
      promise.then(res => {
        onSuccess.emit(res);
      }).catch(res => {
        onFail.emit(res);
      }).finally(() => {
        onComplete.emit();
      });
    }
  }
  render() {
    const { isHover, hoverClass } = this;
    return (h(Host, { class: classNames({
        [hoverClass]: isHover
      }) }));
  }
  static get is() { return "taro-navigator-core"; }
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
      "hoverClass": {
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
        "attribute": "hover-class",
        "reflect": false
      },
      "url": {
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
        "attribute": "url",
        "reflect": false
      },
      "openType": {
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
        "attribute": "open-type",
        "reflect": false,
        "defaultValue": "'navigate'"
      },
      "isHover": {
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
        "attribute": "is-hover",
        "reflect": false,
        "defaultValue": "false"
      },
      "delta": {
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
        "attribute": "delta",
        "reflect": false,
        "defaultValue": "0"
      }
    };
  }
  static get events() {
    return [{
        "method": "onSuccess",
        "name": "cuccess",
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
        "method": "onFail",
        "name": "fail",
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
        "method": "onComplete",
        "name": "complete",
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
  static get listeners() {
    return [{
        "name": "click",
        "method": "onClick",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
