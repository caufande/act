declare class TaroURL {
    #private;
    static createObjectURL(): void;
    static revokeObjectURL(): void;
    constructor(url: string, base?: string);
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
    get searchParams(): URLSearchParams;
    // public method
    toString(): string;
    toJSON(): string;
    // convenient for deconstructor
    _toRaw(): {
        protocol: string;
        port: string;
        host: string;
        hostname: string;
        pathname: string;
        hash: string;
        search: string;
        origin: string;
        href: string;
    };
}
declare const TaroURLProvider: typeof TaroURL;
declare function parseUrl(url?: string): {
    href: string;
    origin: string;
    protocol: string;
    hostname: string;
    host: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
};
export type { TaroURL };
export { TaroURLProvider, parseUrl };
