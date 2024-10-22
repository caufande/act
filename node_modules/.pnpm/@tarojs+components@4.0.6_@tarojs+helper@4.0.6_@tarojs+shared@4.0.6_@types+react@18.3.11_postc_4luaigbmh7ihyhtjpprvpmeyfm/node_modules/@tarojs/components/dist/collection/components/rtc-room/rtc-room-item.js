import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class RtcRoomItem {
  componentDidLoad() {
    notSupport('RtcRoomItem', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-rtc-room-item-core"; }
}
