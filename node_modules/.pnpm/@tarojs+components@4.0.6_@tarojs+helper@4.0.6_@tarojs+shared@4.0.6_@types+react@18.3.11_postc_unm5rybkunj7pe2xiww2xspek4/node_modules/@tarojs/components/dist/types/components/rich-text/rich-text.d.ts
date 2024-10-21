import { ComponentInterface } from '../../stencil-public-runtime';
import type { TextProps } from 'types';
interface Attributes {
  [propName: string]: string | {
    [propName: string]: string;
  };
}
interface NodeType {
  name: string;
  attrs?: Attributes;
  children?: ElementType[];
}
interface TextType {
  type: 'text';
  text: string;
}
type ElementType = NodeType | TextType;
type StringType = string;
export type Nodes = ElementType[] | StringType;
export declare class RichText implements ComponentInterface {
  nodes: Nodes;
  selectable: boolean;
  userSelect: boolean;
  space?: keyof TextProps.TSpace;
  renderNode: (node: ElementType) => string | import("@stencil/core").VNode | null;
  render(): any;
}
export {};
