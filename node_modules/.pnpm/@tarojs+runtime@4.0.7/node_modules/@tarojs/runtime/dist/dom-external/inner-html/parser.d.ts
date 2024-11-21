import { TaroDocument } from "../../dom/document.js";
import { TaroElement } from "../../dom/element.js";
interface Node {
    type: string;
}
interface Comment extends Node {
    type: 'comment';
    content: string;
}
interface Text extends Node {
    type: 'text';
    content: string;
}
interface Element extends Node {
    type: 'element';
    tagName: string;
    children: ChildNode[];
    attributes: string[];
}
interface ParsedTaroElement extends TaroElement {
    h5tagName?: string;
}
type ChildNode = Comment | Text | Element;
declare function parser(html: string, document: TaroDocument): (import("../../index.js").TaroText | TaroElement)[];
export { Text, Element, ParsedTaroElement, parser };
