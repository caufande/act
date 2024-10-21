import { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
export type Mode = 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'heightFix' | 'top' | 'bottom' | 'center' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right';
export declare class Image implements ComponentInterface {
  src: string;
  mode: Mode;
  lazyLoad: boolean;
  nativeProps: {};
  aspectFillMode: string;
  didLoad: boolean;
  onLoad: EventEmitter;
  onError: EventEmitter;
  private imgRef;
  componentDidLoad(): void;
  imageOnLoad(): void;
  imageOnError(e: Event): void;
  render(): any;
}
