import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class Slot {
  componentDidLoad() {
    notSupport('Slot', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-slot-core"; }
}
