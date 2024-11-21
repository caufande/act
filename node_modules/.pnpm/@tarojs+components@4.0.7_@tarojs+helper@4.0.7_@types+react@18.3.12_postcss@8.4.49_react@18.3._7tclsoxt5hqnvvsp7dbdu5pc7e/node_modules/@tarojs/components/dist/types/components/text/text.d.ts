import { ComponentInterface } from '../../stencil-public-runtime';
import type { TextProps } from 'types';
export declare class Text implements ComponentInterface {
  selectable: boolean;
  userSelect: boolean;
  space?: keyof TextProps.TSpace;
  numberOfLines?: number;
  render(): any;
}
