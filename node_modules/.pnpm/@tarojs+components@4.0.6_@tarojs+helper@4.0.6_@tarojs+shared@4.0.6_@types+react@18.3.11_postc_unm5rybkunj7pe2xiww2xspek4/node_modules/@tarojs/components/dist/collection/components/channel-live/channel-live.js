import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class ChannelLive {
  componentDidLoad() {
    notSupport('ChannelLive', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-channel-live-core"; }
}
