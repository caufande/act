import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class PageContainer {
  componentDidLoad() {
    notSupport('PageContainer', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-page-container-core"; }
}
