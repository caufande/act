import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class AdCustom {
  componentDidLoad() {
    notSupport('AdCustom', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-ad-custom-core"; }
}
