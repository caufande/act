/**
 * 错误定义
 * @license GPL-2.0-or-later
 */
declare module './defs';

import { Any, Number, String, TSchema } from '@sinclair/typebox';

export type ErrorDefs = Record<string, Record<string, TSchema>>;
export const errorDefs = {
	NoTitle: {
		floor: Number(),
	},
	WrongBigTitle: {
		floor: Number(),
	},
	TooManyDatesInACommentLine: {
		floor: Number(),
		line: String(),
	},
	NoComment: {
		floor: Number(),
	},
	NoUser: {
		cnbConfig: Any(),
	},
	NoPassword: {
		cnbConfig: Any(),
	},
	NoClientId: {
		cnbConfig: Any(),
	},
	NoClientSecret: {
		cnbConfig: Any(),
	},
} satisfies ErrorDefs;
