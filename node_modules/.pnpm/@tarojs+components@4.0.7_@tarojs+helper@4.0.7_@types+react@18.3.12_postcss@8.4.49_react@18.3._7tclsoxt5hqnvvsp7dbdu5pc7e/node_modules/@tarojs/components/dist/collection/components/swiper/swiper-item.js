import { Host, h } from '@stencil/core';
import { handleStencilNodes } from '../../utils';
import classNames from 'classnames';
export class SwiperItem {
  constructor() {
    this.itemId = undefined;
  }
  //Note: 由于 swiper.js 会通过子元素中的 class 来判断是否为 swiper-slide，所以这里需要在 connectedCallback 中添加 swiper-slide 类名
  connectedCallback() {
    this.el.className = classNames(this.el.className, 'swiper-slide');
  }
  componentDidRender() {
    handleStencilNodes(this.el);
  }
  render() {
    return (h(Host, { "item-id": this.itemId }, h("slot", null)));
  }
  static get is() { return "taro-swiper-item-core"; }
  static get properties() {
    return {
      "itemId": {
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
        "attribute": "item-id",
        "reflect": false
      }
    };
  }
  static get elementRef() { return "el"; }
}
