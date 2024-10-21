declare function throttle(fn: any, threshold?: number, scope?: any): (...args: any[]) => void;
declare function debounce(fn: any, ms?: number, scope?: any): (...args: any[]) => void;
export { throttle, debounce };
