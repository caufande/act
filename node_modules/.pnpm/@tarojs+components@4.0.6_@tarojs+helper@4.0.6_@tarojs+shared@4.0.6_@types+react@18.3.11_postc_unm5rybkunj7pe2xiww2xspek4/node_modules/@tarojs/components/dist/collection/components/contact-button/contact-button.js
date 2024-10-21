import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class ContactButton {
  componentDidLoad() {
    notSupport('ContactButton', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-contact-button-core"; }
}
