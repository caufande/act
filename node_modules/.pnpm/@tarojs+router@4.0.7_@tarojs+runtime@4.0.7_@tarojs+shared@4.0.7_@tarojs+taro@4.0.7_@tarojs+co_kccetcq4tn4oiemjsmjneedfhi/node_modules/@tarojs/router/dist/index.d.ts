import type { History } from 'history';
import type { MpaRouterConfig, SpaRouterConfig } from '../types/router';
export * from './api';
export * from './history';
export { createMultiRouter } from './router/mpa';
export { createRouter } from './router/spa';
export * from './utils';
export declare function handleAppMount(config: SpaRouterConfig | MpaRouterConfig, _: History, appId?: string): void;
export declare function handleAppMountWithTabbar(config: SpaRouterConfig | MpaRouterConfig, history: History, appId?: string): void;
