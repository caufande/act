import { TaroReconciler } from './reconciler';
import type { TaroElement } from '@tarojs/runtime';
import type { ReactNode } from 'react';
import type { OpaqueRoot } from 'react-reconciler';
export declare const ContainerMap: WeakMap<TaroElement, Root>;
type Renderer = typeof TaroReconciler;
type CreateRootOptions = {
    unstable_strictMode?: boolean;
    unstable_concurrentUpdatesByDefault?: boolean;
    unstable_transitionCallbacks?: any;
    identifierPrefix?: string;
    onRecoverableError?: (error: any) => void;
};
export type Callback = () => void | null | undefined;
declare class Root {
    private renderer;
    internalRoot: OpaqueRoot;
    constructor(renderer: Renderer, domContainer: TaroElement, options?: CreateRootOptions);
    private initInternalRoot;
    render(children: ReactNode, cb: Callback): TaroElement | import("react").Component<any, any, any> | null;
    unmount(cb: Callback): void;
}
export declare function render(element: ReactNode, domContainer: TaroElement, cb: Callback): TaroElement | import("react").Component<any, any, any> | null;
export declare function createRoot(domContainer: TaroElement, options?: CreateRootOptions): Root;
export {};
