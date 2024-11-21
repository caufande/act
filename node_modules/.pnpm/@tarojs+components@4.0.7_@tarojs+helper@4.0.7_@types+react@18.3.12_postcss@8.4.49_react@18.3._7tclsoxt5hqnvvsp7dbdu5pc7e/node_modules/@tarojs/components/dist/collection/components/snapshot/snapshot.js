import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class Snapshot {
  componentDidLoad() {
    notSupport('Snapshot', this);
  }
  render() {
    return h(Host, null);
  }
  static get is() { return "taro-snapshot-core"; }
}
