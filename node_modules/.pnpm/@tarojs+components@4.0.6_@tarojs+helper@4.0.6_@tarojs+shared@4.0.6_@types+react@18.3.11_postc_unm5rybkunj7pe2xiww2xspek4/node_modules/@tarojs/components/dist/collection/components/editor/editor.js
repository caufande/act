import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class Editor {
  componentDidLoad() {
    notSupport('Editor', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-editor-core"; }
}
