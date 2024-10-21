import { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
export declare class Canvas implements ComponentInterface {
  private timer;
  canvasId: string;
  height: string;
  width: string;
  nativeProps: {};
  el: HTMLElement;
  onLongTap: EventEmitter;
  onTouchStart: () => void;
  onTouchMove: () => void;
  onTouchEnd: () => void;
  componentDidRender(): void;
  render(): any;
}
