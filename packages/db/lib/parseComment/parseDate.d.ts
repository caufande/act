/**
 * 解析时间
 * @license AGPL-3.0-or-later
 */
declare module './parseDate';
export type Parsed = [Date, Date][];
export declare function parseDate(content: string, floor: number): [Date, Date][];
