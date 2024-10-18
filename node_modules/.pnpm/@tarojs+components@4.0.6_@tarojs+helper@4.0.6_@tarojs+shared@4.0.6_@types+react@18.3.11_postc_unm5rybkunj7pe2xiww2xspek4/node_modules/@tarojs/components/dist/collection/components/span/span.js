import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class Span {
  componentDidLoad() {
    notSupport('Span', this);
  }
  render() {
    return h(Host, null);
  }
  static get is() { return "taro-span-core"; }
}
