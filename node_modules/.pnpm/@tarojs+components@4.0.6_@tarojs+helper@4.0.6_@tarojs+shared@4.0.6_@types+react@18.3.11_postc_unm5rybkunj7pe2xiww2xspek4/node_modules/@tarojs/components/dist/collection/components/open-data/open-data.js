import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class OpenData {
  componentDidLoad() {
    notSupport('OpenData', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-open-data-core"; }
}
