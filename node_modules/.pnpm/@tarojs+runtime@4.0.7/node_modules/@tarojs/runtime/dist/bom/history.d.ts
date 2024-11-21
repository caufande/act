import { Events } from "../emitter/emitter.js";
import { RuntimeCache } from "../utils/cache.js";
import { TaroLocation } from "./location.js";
interface HistoryState {
    state: Record<string, any> | null;
    title: string;
    url: string;
}
type Options = {
    window: any;
};
type HistoryContext = {
    location: TaroLocation;
    stack: HistoryState[];
    cur: number;
};
declare class TaroHistory extends Events {
    #private;
    constructor(location: TaroLocation, options: Options);
    get length(): number;
    get state(): Record<string, any> | null;
    /* public method */
    go(delta: number): void;
    back(): void;
    forward(): void;
    pushState(state: any, title: string, url: string): void;
    replaceState(state: any, title: string, url: string): void;
    get cache(): RuntimeCache<HistoryContext>;
}
declare const History: typeof TaroHistory;
export { HistoryState, History };
export type { TaroHistory };
