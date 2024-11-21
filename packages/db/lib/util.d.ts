/**
 * 实用工具
 * @license AGPL-3.0-or-later
 */
declare module './util';
import { JSONContent } from 'html-to-json-parser/dist/types';
export declare function range(from: number, to: number): any[];
export declare function lowerFirst(str: string): string;
export declare function removeBlankBetweenAttr(str: string): string;
export declare function textToDate(text: string): Date;
export declare function postHtmlToJson(postHtml: string): Promise<JSONContent>;
export declare function deepEqual(a: unknown, b: unknown): boolean;
export declare function getHolder<T>(): {
    promise: Promise<T>;
    res: (n: T) => void;
};
export declare const NetDebounce: <R, P extends any[], N = unknown>(comparator?: (args: P, argsCached: P) => boolean) => (target: (this: N, ...args: P) => Promise<R>) => typeof target;
