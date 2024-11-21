import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class Tabs {
  componentDidLoad() {
    notSupport('Tabs', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-tabs-core"; }
}
