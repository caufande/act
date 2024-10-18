/**
 * 错误定义
 * @license GPL-2.0-or-later
 */
declare module './defs';

import { TSchema, Type } from '@sinclair/typebox';

export type ErrorDefs = Record<string, Record<string, TSchema>>;
export const errorDefs = {
	NoTitle: {
		floor: Type.Number(),
	},
	WrongBigTitle: {
		floor: Type.Number(),
	},
	TooManyDatesInACommentLine: {
		floor: Type.Number(),
		line: Type.String(),
	},
} satisfies ErrorDefs;
