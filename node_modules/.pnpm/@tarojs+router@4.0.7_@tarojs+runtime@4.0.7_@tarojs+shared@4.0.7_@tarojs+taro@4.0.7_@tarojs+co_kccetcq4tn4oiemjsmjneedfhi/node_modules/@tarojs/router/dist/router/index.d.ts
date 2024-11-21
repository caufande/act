import type { MpaRouterConfig, SpaRouterConfig } from '../../types/router';
export declare class RouterConfig {
    private static __config;
    static set config(e: SpaRouterConfig | MpaRouterConfig);
    static get config(): SpaRouterConfig | MpaRouterConfig;
    static get pages(): string[];
    static get router(): import("../../types/router").Router;
    static get mode(): "hash" | "browser" | "multi";
    static get customRoutes(): Record<string, string | string[]>;
    static isPage(url?: string): boolean;
}
