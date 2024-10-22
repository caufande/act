import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class ShareElement {
  componentDidLoad() {
    notSupport('ShareElement', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-share-element-core"; }
}
