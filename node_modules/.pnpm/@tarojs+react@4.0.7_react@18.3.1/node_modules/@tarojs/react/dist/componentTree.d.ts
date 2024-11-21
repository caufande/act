import type { TaroElement, TaroText } from '@tarojs/runtime';
import type { Fiber } from 'react-reconciler';
import type { Props } from './props';
export declare function precacheFiberNode(hostInst: Fiber, node: TaroElement | TaroText): void;
export declare function markContainerAsRoot(hostRoot: Fiber, node: TaroElement | TaroText): void;
export declare function unmarkContainerAsRoot(node: TaroElement | TaroText): void;
export declare function isContainerMarkedAsRoot(node: TaroElement | TaroText): boolean;
/**
 * Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
 * instance, or null if the node was not rendered by this React.
 */
export declare function getInstanceFromNode(node: TaroElement | TaroText): Fiber | null;
/**
 * Given a ReactDOMComponent or ReactDOMTextComponent, return the corresponding
 * DOM node.
 */
export declare function getNodeFromInstance(inst: Fiber): any;
export declare function getFiberCurrentPropsFromNode(node: TaroElement | TaroText): Props;
export declare function updateFiberProps(node: TaroElement | TaroText, props: Props): void;
