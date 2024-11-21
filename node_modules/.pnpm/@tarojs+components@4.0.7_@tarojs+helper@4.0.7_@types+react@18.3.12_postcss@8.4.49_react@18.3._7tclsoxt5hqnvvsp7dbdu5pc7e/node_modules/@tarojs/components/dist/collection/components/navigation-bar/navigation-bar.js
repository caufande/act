import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class NavigationBar {
  componentDidLoad() {
    notSupport('NavigationBar', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-navigation-bar-core"; }
}
