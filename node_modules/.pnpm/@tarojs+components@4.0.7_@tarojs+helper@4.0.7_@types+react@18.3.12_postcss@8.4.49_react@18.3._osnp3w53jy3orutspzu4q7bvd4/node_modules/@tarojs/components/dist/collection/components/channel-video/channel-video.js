import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class ChannelVideo {
  componentDidLoad() {
    notSupport('ChannelVideo', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-channel-video-core"; }
}
