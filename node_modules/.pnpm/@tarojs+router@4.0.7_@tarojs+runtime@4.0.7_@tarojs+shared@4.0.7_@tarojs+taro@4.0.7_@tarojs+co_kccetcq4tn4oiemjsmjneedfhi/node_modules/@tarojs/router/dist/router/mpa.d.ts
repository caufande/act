import type { AppInstance } from '@tarojs/runtime';
import type { History } from 'history';
import type { MpaRouterConfig } from '../../types/router';
/** Note: 关于多页面应用
 * - 需要配置路由映射（根目录跳转、404 页面……）
 * - app.onPageNotFound 事件不支持
 * - 应用生命周期可能多次触发
 * - TabBar 会多次加载
 * - 不支持路由动画
 */
export declare function createMultiRouter(history: History, app: AppInstance, config: MpaRouterConfig, framework?: string): Promise<void>;
