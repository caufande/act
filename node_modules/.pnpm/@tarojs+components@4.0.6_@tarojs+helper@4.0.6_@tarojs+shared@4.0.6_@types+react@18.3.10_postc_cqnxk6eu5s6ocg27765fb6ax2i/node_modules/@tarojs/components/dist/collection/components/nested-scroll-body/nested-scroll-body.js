import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class NestedScrollBody {
  componentDidLoad() {
    notSupport('NestedScrollBody', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-nested-scroll-body-core"; }
}
