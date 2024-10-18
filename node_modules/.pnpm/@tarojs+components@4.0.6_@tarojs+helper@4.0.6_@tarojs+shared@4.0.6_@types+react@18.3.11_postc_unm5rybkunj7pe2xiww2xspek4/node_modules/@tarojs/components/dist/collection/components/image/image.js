import { h, Host } from '@stencil/core';
import classNames from 'classnames';
export class Image {
  constructor() {
    this.src = undefined;
    this.mode = 'scaleToFill';
    this.lazyLoad = false;
    this.nativeProps = {};
    this.aspectFillMode = 'width';
    this.didLoad = false;
  }
  componentDidLoad() {
    if (!this.lazyLoad)
      return;
    const lazyImg = new IntersectionObserver(entries => {
      // 异步 api 关系
      if (entries[entries.length - 1].isIntersecting) {
        lazyImg.unobserve(this.imgRef);
        this.didLoad = true;
      }
    }, {
      rootMargin: '300px 0px'
    });
    lazyImg.observe(this.imgRef);
  }
  imageOnLoad() {
    const { width, height, naturalWidth, naturalHeight } = this.imgRef;
    this.onLoad.emit({
      width,
      height
    });
    this.aspectFillMode = naturalWidth > naturalHeight ? 'width' : 'height';
  }
  imageOnError(e) {
    this.onError.emit(e);
  }
  render() {
    const { src, lazyLoad = false, aspectFillMode = 'width', imageOnLoad, imageOnError, nativeProps, didLoad } = this;
    // mode="" 按默认值处理
    const mode = this.mode || 'scaleToFill';
    const cls = classNames({
      'taro-img__widthfix': mode === 'widthFix'
    });
    const imgCls = classNames(`taro-img__mode-${mode.toLowerCase().replace(/\s/g, '')}`, {
      [`taro-img__mode-aspectfill--${aspectFillMode}`]: mode === 'aspectFill'
    });
    return (h(Host, { class: cls }, src ? (h("img", Object.assign({ ref: (img) => (this.imgRef = img), class: imgCls, src: lazyLoad && !didLoad ? undefined : src, onLoad: imageOnLoad.bind(this), onError: imageOnError.bind(this) }, nativeProps))) : ''));
  }
  static get is() { return "taro-image-core"; }
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
      "src": {
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
        "attribute": "src",
        "reflect": false
      },
      "mode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Mode",
          "resolved": "\"aspectFill\" | \"aspectFit\" | \"bottom left\" | \"bottom right\" | \"bottom\" | \"center\" | \"heightFix\" | \"left\" | \"right\" | \"scaleToFill\" | \"top left\" | \"top right\" | \"top\" | \"widthFix\"",
          "references": {
            "Mode": {
              "location": "local"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "mode",
        "reflect": false,
        "defaultValue": "'scaleToFill'"
      },
      "lazyLoad": {
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
        "attribute": "lazy-load",
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
      "aspectFillMode": {},
      "didLoad": {}
    };
  }
  static get events() {
    return [{
        "method": "onLoad",
        "name": "load",
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
        "method": "onError",
        "name": "error",
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
}
