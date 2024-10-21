import { TaroElement } from "../dom/element.js";
import { TaroNode } from "../dom/node.js";
import { TaroText } from "../dom/text.js";
import { TFunc } from "../index-26658829.js";
declare const incrementId: () => () => string;
declare function isElement(node: TaroNode): node is TaroElement;
declare function isText(node: TaroNode): node is TaroText;
declare function isComment(node: TaroNode): boolean;
declare function isHasExtractProp(el: TaroElement): boolean;
/**
 * 往上寻找组件树直到 root，寻找是否有祖先组件绑定了同类型的事件
 * @param node 当前组件
 * @param type 事件类型
 */
declare function isParentBinded(node: TaroElement | null, type: string): boolean;
declare function shortcutAttr(key: string): string;
declare const customWrapperCache: Map<string, Record<string, any>>;
interface Ctor {
    new (...args: any[]): any;
}
declare function extend(ctor: Ctor, methodName: string, options: TFunc | Record<string, any>): void;
declare function getComponentsAlias(): any;
declare function convertNumber2PX(value: number): string;
export { incrementId, isElement, isText, isComment, isHasExtractProp, isParentBinded, shortcutAttr, customWrapperCache, extend, getComponentsAlias, convertNumber2PX };
export * from "./lodash.js";
export * from "./router.js";
