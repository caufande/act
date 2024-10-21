import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class Camera {
  componentDidLoad() {
    notSupport('Camera', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-camera-core"; }
}
