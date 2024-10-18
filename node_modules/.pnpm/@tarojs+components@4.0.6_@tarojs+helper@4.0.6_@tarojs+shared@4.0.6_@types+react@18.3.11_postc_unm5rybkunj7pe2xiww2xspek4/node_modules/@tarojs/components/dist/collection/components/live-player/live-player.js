import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class LivePlayer {
  componentDidLoad() {
    notSupport('LivePlayer', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-live-player-core"; }
}
