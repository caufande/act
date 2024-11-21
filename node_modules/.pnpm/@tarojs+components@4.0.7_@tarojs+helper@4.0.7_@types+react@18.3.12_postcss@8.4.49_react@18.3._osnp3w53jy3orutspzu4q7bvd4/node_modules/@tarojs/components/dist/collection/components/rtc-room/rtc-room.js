import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class RtcRoom {
  componentDidLoad() {
    notSupport('RtcRoom', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-rtc-room-core"; }
}
