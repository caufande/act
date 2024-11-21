import { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
/**
 * TODO: 参数还需要进一步细化对齐
 * Navigator组件
 * https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html
 **/
export declare class Navigator implements ComponentInterface {
  hoverClass: string;
  url: string;
  openType: string;
  isHover: boolean;
  delta: number;
  onSuccess: EventEmitter;
  onFail: EventEmitter;
  onComplete: EventEmitter;
  onClick(): void;
  render(): any;
}
