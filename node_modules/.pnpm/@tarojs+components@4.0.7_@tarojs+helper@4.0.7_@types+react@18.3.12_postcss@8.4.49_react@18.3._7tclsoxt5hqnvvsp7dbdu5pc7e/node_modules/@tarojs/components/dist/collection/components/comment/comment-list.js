import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class CommentList {
  componentDidLoad() {
    notSupport('CommentList', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-comment-list-core"; }
}
