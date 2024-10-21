import { internalInstanceKey } from './constant';
import { createRoot, render } from './render';
import type { TaroElement } from '@tarojs/runtime';
import type { ReactNode } from 'react';
declare const unstable_batchedUpdates: (fn: any, a: any) => any;
declare function unmountComponentAtNode(dom: TaroElement): boolean;
declare function findDOMNode(comp?: TaroElement | ReactNode): string | number | boolean | TaroElement | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | Iterable<ReactNode> | null;
declare function createPortal(children: ReactNode, containerInfo: TaroElement, key?: string): {
    $$typeof: number | symbol;
    key: string | null;
    children: ReactNode;
    containerInfo: TaroElement;
    implementation: null;
};
declare const flushSync: {
    (): void;
    <R>(fn: () => R): R;
};
export { createPortal, createRoot, findDOMNode, flushSync, internalInstanceKey, render, unmountComponentAtNode, unstable_batchedUpdates, };
declare const _default: {
    render: typeof render;
    flushSync: {
        (): void;
        <R>(fn: () => R): R;
    };
    createRoot: typeof createRoot;
    unstable_batchedUpdates: (fn: any, a: any) => any;
    unmountComponentAtNode: typeof unmountComponentAtNode;
    findDOMNode: typeof findDOMNode;
    createPortal: typeof createPortal;
    internalInstanceKey: string;
};
export default _default;
