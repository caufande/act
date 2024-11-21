import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class OfficialAccount {
  componentDidLoad() {
    notSupport('OfficialAccount', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-official-account-core"; }
}
