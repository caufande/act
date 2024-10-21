import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class Lifestyle {
  componentDidLoad() {
    notSupport('Lifestyle', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-lifestyle-core"; }
}
