import { TaroElement } from "./element.js";
declare class AnchorElement extends TaroElement {
    get href(): string;
    set href(val: string);
    get protocol(): any;
    get host(): any;
    get search(): any;
    get hash(): any;
    get hostname(): any;
    get port(): any;
    get pathname(): any;
    setAttribute(qualifiedName: string, value: any): void;
}
export { AnchorElement };
