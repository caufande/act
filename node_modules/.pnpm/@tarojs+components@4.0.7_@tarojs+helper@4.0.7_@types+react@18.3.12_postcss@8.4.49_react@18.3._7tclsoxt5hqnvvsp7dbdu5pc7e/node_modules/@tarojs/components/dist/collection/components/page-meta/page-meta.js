import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class PageMeta {
  componentDidLoad() {
    notSupport('PageMeta', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-page-meta-core"; }
}
