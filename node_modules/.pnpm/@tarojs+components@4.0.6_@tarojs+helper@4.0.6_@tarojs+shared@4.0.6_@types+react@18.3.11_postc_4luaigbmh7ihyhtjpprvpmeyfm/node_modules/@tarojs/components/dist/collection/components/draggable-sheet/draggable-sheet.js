import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class DraggableSheet {
  componentDidLoad() {
    notSupport('DraggableSheet', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-draggable-sheet-core"; }
}
