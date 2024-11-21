import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class Lottie {
  componentDidLoad() {
    notSupport('Lottie', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-lottie-core"; }
}
