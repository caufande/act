import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class LivePusher {
  componentDidLoad() {
    notSupport('LivePusher', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-live-pusher-core"; }
}
