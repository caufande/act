import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class AnimationVideo {
  componentDidLoad() {
    notSupport('AnimationVideo', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-animation-video-core"; }
}
