import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class StickyHeader {
  componentDidLoad() {
    notSupport('StickyHeader', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-sticky-header-core"; }
}
