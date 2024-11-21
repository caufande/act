import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class OpenContainer {
  componentDidLoad() {
    notSupport('OpenContainer', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-open-container-core"; }
}
