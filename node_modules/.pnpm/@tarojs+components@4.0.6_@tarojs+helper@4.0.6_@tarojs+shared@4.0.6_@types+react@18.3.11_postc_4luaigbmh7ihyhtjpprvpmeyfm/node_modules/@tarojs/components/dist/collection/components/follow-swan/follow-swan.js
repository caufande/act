import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class FollowSwan {
  componentDidLoad() {
    notSupport('FollowSwan', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-follow-swan-core"; }
}
