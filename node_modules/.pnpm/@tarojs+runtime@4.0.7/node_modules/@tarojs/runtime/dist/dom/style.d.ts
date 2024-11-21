import { TaroElement } from "./element.js";
declare class Style {
    _pending: boolean;
    _usedStyleProp: Set<string>;
    _value: Partial<CSSStyleDeclaration>;
    _element: TaroElement;
    constructor(element: TaroElement);
    private setCssVariables;
    get cssText(): string;
    set cssText(str: string);
    setProperty(propertyName: string, value?: string | null): void;
    removeProperty(propertyName: string): string;
    getPropertyValue(propertyName: string): any;
}
export { Style };
