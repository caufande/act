import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class KeyboardAccessory {
  componentDidLoad() {
    notSupport('KeyboardAccessory', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-keyboard-accessory-core"; }
}
