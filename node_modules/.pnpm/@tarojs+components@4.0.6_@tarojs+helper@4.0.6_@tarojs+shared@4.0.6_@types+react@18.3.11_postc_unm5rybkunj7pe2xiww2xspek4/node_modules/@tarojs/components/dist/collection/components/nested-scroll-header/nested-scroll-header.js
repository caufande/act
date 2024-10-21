import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class NestedScrollHeader {
  componentDidLoad() {
    notSupport('NestedScrollHeader', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-nested-scroll-header-core"; }
}
