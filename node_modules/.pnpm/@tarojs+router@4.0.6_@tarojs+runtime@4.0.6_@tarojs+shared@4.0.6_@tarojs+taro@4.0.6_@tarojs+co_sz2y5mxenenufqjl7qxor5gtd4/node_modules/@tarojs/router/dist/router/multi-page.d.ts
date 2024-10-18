import type { PageInstance } from '@tarojs/runtime';
import type { PageConfig } from '@tarojs/taro';
import type { History } from 'history';
import type { MpaRouterConfig, Route } from '../../types/router';
export default class MultiPageHandler {
    history: History;
    protected config: MpaRouterConfig;
    constructor(config: MpaRouterConfig, history: History);
    get appId(): string;
    get router(): import("../../types/router").Router;
    get routerMode(): "hash" | "browser" | "multi";
    get customRoutes(): Record<string, string | string[]>;
    get tabBarList(): import("@tarojs/taro").TabBarItem[];
    get PullDownRefresh(): any;
    set pathname(p: string);
    get pathname(): string;
    get basename(): string;
    get pageConfig(): Route;
    get isTabBar(): boolean;
    get search(): string;
    get usingWindowScroll(): boolean;
    getQuery(search?: string, options?: Record<string, unknown>): {
        [x: string]: unknown;
    };
    isDefaultNavigationStyle(): boolean;
    mount(): void;
    onReady(page: PageInstance, onLoad?: boolean): void;
    load(page: PageInstance, pageConfig?: Route): void;
    getPageContainer(page?: PageInstance | null): HTMLElement | null;
    getScrollingElement(page?: PageInstance | null): (Window & typeof globalThis) | HTMLElement;
    bindPageEvents(page: PageInstance, config?: Partial<PageConfig>): void;
    triggerRouterChange(): void;
}
