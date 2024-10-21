import { TaroElement } from "./element.js";
import { TaroEvent } from "./event.js";
declare class FormElement extends TaroElement {
    get type(): string;
    set type(val: string);
    get value(): string | boolean | number | any[];
    set value(val: string | boolean | number | any[]);
    dispatchEvent(event: TaroEvent): boolean;
}
export { FormElement };
