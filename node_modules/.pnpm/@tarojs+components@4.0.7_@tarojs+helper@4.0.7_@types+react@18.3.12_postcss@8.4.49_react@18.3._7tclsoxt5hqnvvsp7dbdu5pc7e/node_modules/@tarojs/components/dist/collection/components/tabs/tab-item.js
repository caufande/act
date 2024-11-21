import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class TabItem {
  componentDidLoad() {
    notSupport('TabItem', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-tab-item-core"; }
}
