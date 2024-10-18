/**
 * ease-in-out的函数
 * @param t 0-1的数字
 */
declare const easeInOut: (t: number) => number;
declare const getTimingFunc: (easeFunc: any, frameCnt: any) => (x: any) => any;
export { easeInOut, getTimingFunc };
