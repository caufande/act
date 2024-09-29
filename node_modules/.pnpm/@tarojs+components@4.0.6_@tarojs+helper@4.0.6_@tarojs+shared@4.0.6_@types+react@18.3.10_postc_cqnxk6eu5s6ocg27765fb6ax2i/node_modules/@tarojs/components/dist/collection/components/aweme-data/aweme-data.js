import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class AwemeData {
  componentDidLoad() {
    notSupport('AwemeData', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-aweme-data-core"; }
}
