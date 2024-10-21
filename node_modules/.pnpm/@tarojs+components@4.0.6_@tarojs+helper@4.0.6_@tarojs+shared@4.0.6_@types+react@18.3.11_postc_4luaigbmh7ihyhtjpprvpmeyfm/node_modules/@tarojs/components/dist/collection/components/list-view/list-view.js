import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class ListView {
  componentDidLoad() {
    notSupport('ListView', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-list-view-core"; }
}
