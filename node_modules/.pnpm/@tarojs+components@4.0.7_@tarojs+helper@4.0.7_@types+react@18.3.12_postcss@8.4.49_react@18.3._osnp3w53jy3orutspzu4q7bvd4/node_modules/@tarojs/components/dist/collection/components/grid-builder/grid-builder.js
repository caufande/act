import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class GridBuilder {
  componentDidLoad() {
    notSupport('GridBuilder', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-grid-builder-core"; }
}
