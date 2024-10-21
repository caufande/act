import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class ListBuilder {
  componentDidLoad() {
    notSupport('ListBuilder', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-list-builder-core"; }
}
