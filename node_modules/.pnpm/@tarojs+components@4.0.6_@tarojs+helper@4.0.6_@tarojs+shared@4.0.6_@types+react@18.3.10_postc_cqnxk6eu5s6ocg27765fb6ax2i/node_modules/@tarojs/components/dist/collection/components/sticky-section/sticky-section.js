import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class StickySection {
  componentDidLoad() {
    notSupport('StickySection', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-sticky-section-core"; }
}
