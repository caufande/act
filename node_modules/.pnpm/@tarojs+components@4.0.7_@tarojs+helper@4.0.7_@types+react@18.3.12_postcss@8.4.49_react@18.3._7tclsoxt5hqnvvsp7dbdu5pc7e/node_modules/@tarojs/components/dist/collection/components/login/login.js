import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class Login {
  componentDidLoad() {
    notSupport('Login', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-login-core"; }
}
