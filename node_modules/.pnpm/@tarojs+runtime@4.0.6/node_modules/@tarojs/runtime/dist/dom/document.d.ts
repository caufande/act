import { TaroElement } from "./element.js";
import { createEvent } from "./event.js";
import { FormElement } from "./form.js";
import { TaroRootElement } from "./root.js";
import { TaroText } from "./text.js";
declare class TaroDocument extends TaroElement {
    documentElement: TaroElement;
    head: TaroElement;
    body: TaroElement;
    createEvent: typeof createEvent;
    cookie?: string;
    constructor();
    createElement(type: string): TaroElement | TaroRootElement | FormElement;
    // an ugly fake createElementNS to deal with @vue/runtime-dom's
    // support mounting app to svg container since vue@3.0.8
    createElementNS(_svgNS: string, type: string): TaroElement | TaroRootElement | FormElement;
    createTextNode(text: string): TaroText;
    getElementById<T extends TaroElement>(id: string | undefined | null): T | null;
    querySelector<T extends TaroElement>(query: string): T | null;
    querySelectorAll(): never[];
    // @TODO: @PERF: 在 hydrate 移除掉空的 node
    createComment(): TaroText;
    get defaultView(): any;
}
export { TaroDocument };
