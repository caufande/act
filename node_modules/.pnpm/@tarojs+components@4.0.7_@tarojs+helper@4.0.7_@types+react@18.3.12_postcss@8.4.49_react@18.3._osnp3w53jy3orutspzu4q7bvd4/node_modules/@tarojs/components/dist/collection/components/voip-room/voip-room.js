import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class VoipRoom {
  componentDidLoad() {
    notSupport('VoipRoom', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-voip-room-core"; }
}
