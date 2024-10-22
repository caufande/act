declare class RoutesAlias {
    conf: Array<string[]>;
    set(customRoutes?: Record<string, string | string[]>): void;
    getConfig: (url?: string) => string[];
    getOrigin: (url?: string) => string;
    getAlias: (url?: string) => string;
    getAll: (url?: string) => string[];
}
export declare const routesAlias: RoutesAlias;
export * from './navigate';
