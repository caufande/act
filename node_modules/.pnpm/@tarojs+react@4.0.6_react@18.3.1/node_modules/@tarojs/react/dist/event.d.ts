import type { TaroElement, TaroEvent } from '@tarojs/runtime';
import type { Fiber } from 'react-reconciler';
export type RestoreType = string | number | boolean | any[];
interface RestoreItem {
    target: TaroElement;
    value: RestoreType;
}
export declare function getTargetInstForInputOrChangeEvent(e: TaroEvent, node: TaroElement): false | Fiber | undefined;
export declare function enqueueStateRestore(target: RestoreItem): void;
export declare function needsStateRestore(): boolean;
export declare function finishEventHandler(): void;
export declare function restoreStateIfNeeded(): void;
export {};
