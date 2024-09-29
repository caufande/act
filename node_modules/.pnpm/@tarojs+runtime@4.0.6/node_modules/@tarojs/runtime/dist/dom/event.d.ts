import { EventOptions, MpEvent } from "../index-26658829.js";
import { TaroElement } from "./element.js";
declare class TaroEvent {
    private cacheTarget;
    private cacheCurrentTarget;
    type: string;
    bubbles: boolean;
    cancelable: boolean;
    _stop: boolean;
    _end: boolean;
    defaultPrevented: boolean;
    button: number;
    timeStamp: number;
    mpEvent: MpEvent | undefined;
    constructor(type: string, opts: EventOptions, event?: MpEvent);
    stopPropagation(): void;
    stopImmediatePropagation(): void;
    preventDefault(): void;
    get target(): any;
    get currentTarget(): any;
}
declare function createEvent(event: MpEvent | string, node?: TaroElement): TaroEvent;
declare function eventHandler(event: MpEvent): any;
export { TaroEvent, createEvent, eventHandler };
