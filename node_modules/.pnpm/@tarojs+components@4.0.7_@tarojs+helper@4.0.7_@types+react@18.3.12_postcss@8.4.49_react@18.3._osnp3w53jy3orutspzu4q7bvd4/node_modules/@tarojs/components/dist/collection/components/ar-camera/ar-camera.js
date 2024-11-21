import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class ArCamera {
  componentDidLoad() {
    notSupport('ArCamera', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-ar-camera-core"; }
}
