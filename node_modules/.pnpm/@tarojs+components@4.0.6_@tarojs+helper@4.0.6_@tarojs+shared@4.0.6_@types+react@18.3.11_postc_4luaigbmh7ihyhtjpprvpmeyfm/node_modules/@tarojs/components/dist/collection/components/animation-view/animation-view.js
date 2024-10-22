import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class AnimationView {
  componentDidLoad() {
    notSupport('AnimationView', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-animation-view-core"; }
}
