import type { AppInstance } from '@tarojs/runtime';
import type { History } from 'history';
import type { SpaRouterConfig } from '../../types/router';
export declare function createRouter(history: History, app: AppInstance, config: SpaRouterConfig, framework?: string): () => void;
