import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class MatchMedia {
  componentDidLoad() {
    notSupport('MatchMedia', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-match-media-core"; }
}
