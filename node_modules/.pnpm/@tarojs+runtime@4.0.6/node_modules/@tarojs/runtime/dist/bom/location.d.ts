import { Events } from "../emitter/emitter.js";
import { RuntimeCache } from "../utils/cache.js";
type Options = {
    window: any;
};
type LocationContext = {
    lastHref: string;
};
declare class TaroLocation extends Events {
    #private;
    constructor(options: Options);
    get protocol(): string;
    set protocol(val: string);
    get host(): string;
    set host(val: string);
    get hostname(): string;
    set hostname(val: string);
    get port(): string;
    set port(val: string);
    get pathname(): string;
    set pathname(val: string);
    get search(): string;
    set search(val: string);
    get hash(): string;
    set hash(val: string);
    get href(): string;
    set href(val: string);
    get origin(): string;
    set origin(val: string);
    /* public method */
    assign(): void;
    reload(): void;
    replace(url: string): void;
    toString(): string;
    get cache(): RuntimeCache<LocationContext>;
}
declare const Location: typeof TaroLocation;
export type { TaroLocation };
export { Location };
