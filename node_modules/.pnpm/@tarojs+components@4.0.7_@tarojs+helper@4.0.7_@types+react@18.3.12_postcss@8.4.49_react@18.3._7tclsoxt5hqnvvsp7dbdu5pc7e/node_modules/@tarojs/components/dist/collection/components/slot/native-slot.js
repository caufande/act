import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class NativeSlot {
  componentDidLoad() {
    notSupport('NativeSlot', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-native-slot-core"; }
}
