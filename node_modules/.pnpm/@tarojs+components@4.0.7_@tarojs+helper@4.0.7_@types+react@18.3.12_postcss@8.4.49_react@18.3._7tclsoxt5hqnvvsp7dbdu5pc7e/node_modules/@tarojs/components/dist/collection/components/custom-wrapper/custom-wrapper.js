import { h, Host } from '@stencil/core';
export class CustomWrapper {
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-custom-wrapper-core"; }
}
