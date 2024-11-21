import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class GridView {
  componentDidLoad() {
    notSupport('GridView', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-grid-view-core"; }
}
