import { TaroElement } from "./dom/element.js";
import { TaroText } from "./dom/text.js";
import { Element, Text } from "./dom-external/inner-html/parser.js";
interface Options {
    prerender: boolean;
    debug: boolean;
    html?: {
        skipElements: Set<string>;
        voidElements: Set<string>;
        closingElements: Set<string>;
        transformText?: (taroText: TaroText, text: Text) => TaroText;
        transformElement?: (taroElement: TaroElement, element: Element) => TaroElement;
        renderHTMLTag: boolean;
    };
    miniGlobal?: any;
}
export { Options };
