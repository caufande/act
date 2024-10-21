import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class Like {
  componentDidLoad() {
    notSupport('Like', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-like-core"; }
}
