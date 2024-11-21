import { h, Host } from '@stencil/core';
import { notSupport } from '../../utils';
export class CommentDetail {
  componentDidLoad() {
    notSupport('CommentDetail', this);
  }
  render() {
    return (h(Host, null));
  }
  static get is() { return "taro-comment-detail-core"; }
}
