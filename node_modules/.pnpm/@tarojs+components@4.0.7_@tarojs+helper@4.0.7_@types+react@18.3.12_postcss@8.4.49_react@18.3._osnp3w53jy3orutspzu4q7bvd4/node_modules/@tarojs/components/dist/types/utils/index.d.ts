export declare function throttle(fn: any, threshold?: number, scope?: any): (...args: any[]) => void;
export declare function debounce(fn: any, ms?: number, scope?: any): (...args: any[]) => void;
export * from './helper';
export * from './style';
export * from './url';
export declare function isVisible(e: HTMLElement): boolean;
export declare function isElement(e: HTMLElement): boolean;
export declare function isNode(e: Node): boolean;
