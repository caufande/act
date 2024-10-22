import { TaroNode } from "../dom/node.js";
type IPosition = 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';
/**
 * An implementation of `Element.insertAdjacentHTML()`
 * to support Vue 3 with a version of or greater than `vue@3.1.2`
 */
declare function insertAdjacentHTML(this: TaroNode, position: IPosition, html: string): void;
declare function cloneNode(this: TaroNode, isDeep?: boolean): any;
declare function contains(this: TaroNode, node: TaroNode & {
    id?: string;
}): boolean;
export { IPosition, insertAdjacentHTML, cloneNode, contains };
