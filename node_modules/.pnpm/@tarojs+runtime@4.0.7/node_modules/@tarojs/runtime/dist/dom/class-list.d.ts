import { TaroElement } from "./element.js";
declare class ClassList {
    private el;
    private tokenList;
    constructor(className: string, el: TaroElement);
    get value(): string;
    get length(): number;
    add(): void;
    remove(): void;
    contains(token: string): boolean;
    toggle(token: string, force: boolean): boolean;
    replace(token: string, replacement_token: string): void;
    toString(): string;
    private checkTokenIsValid;
    private _update;
}
export { ClassList };
