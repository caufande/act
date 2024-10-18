import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class FunctionalPageNavigator {
  componentDidLoad() {
    notSupport('FunctionalPageNavigator', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-functional-page-navigator-core"; }
}
