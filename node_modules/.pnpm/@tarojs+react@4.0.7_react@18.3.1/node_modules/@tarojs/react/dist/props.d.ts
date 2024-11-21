import type { TaroElement } from '@tarojs/runtime';
export type Props = Record<string, unknown>;
export declare function updateProps(dom: TaroElement, oldProps: Props, newProps: Props): void;
export declare function updatePropsByPayload(dom: TaroElement, oldProps: Props, updatePayload: any[]): void;
export declare function getUpdatePayload(dom: TaroElement, oldProps: Props, newProps: Props): any[] | null;
