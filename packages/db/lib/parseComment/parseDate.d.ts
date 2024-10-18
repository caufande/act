import { JSONContent } from 'html-to-json-parser/dist/types';
/**
 * 解析时间
 * @license GPL-2.0-or-later
 */
declare module './parseDate';
export declare function getText(json: JSONContent): string;
export type Parsed = [Date, Date][];
export declare function parseDate(content: string, floor: number): [Date, Date][];
