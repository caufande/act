import { Action, createBrowserHistory, createHashHistory } from 'history';
import type { IH5RouterConfig } from '@tarojs/taro/types/compile';
import type { Blocker, BrowserHistoryOptions, HashHistoryOptions, History, Listener, Location, Path, To } from 'history';
import type { StateEvent } from '../types/history';
export declare let history: History;
declare class MpaHistory implements History {
    action: Action;
    get location(): Location;
    createHref(_to: To): string;
    parseUrl(to: Partial<Path>): string;
    push(to: Partial<Path>, _state?: Record<string, unknown>): void;
    replace(to: Partial<Path>, _state?: Record<string, unknown>): void;
    go(delta: number): void;
    back: () => void;
    forward: () => void;
    listen(listener: Listener): () => void;
    block(_blocker: Blocker): () => void;
    pushState: globalThis.History['pushState'];
    replaceState: globalThis.History['replaceState'];
    eventState(action: Required<StateEvent>['action']): (data: any, unused: string, url?: string | URL | null) => any;
}
export declare function setHistory(h: History, base?: string): void;
export declare function createMpaHistory(_?: HashHistoryOptions | BrowserHistoryOptions): MpaHistory;
export { createBrowserHistory, createHashHistory };
export declare function setHistoryMode(mode?: IH5RouterConfig['mode'], base?: string): void;
export declare function prependBasename(url?: string): string;
