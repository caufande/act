/**
 * 错误定义
 * @license GPL-2.0-or-later
 */
declare module './defs';

export type ErrorDefs = Record<string, (n: any) => any>;
export const errorDefs = {
	NoTitle: (n: { floor: number }) => n,
	WrongBigTitle: (n: { floor: number }) => n,
} satisfies ErrorDefs;
