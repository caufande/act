/**
 * 一些使用工具函数
 * @license AGPL-3.0-or-later
 */
declare module './util';
export declare function calcWhichPage(floor: number, total: number, pageSize: number): {
    pageIndex: number;
    eleIndex: number;
};
export declare function calcPageNum(total: number, pageSize: number): number;
