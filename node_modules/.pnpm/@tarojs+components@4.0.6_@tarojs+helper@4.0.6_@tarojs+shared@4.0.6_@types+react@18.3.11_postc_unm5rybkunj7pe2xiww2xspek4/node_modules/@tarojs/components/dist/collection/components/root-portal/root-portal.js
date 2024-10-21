import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class RootPortal {
  componentDidLoad() {
    notSupport('RootPortal', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-root-portal-core"; }
}
