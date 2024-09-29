import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class InlinePaymentPanel {
  componentDidLoad() {
    notSupport('InlinePaymentPanel', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-inline-payment-panel-core"; }
}
