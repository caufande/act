import type { PageInstance } from '@tarojs/runtime';
declare class Stacks {
    stacks: PageInstance[];
    backDelta: number;
    tabs: {};
    methodName: string;
    set delta(delta: number);
    get delta(): number;
    set method(methodName: string);
    get method(): string;
    get length(): number;
    get last(): PageInstance;
    get(): PageInstance[];
    getItem(index: number): PageInstance;
    getLastIndex(pathname: string, stateWith?: number): number;
    getDelta(pathname: string): number;
    getPrevIndex(pathname: string, stateWith?: number): number;
    pop(): PageInstance | undefined;
    push(page: PageInstance): number;
    getTabs(): {};
    pushTab(path: string): void;
    popTab(path: string): void;
    removeTab(path: string): void;
}
declare const stacks: Stacks;
export default stacks;
