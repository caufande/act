/**
 * 错误定义
 * @license AGPL-3.0-or-later
 */
declare module './defs';

import { Any, Enum, Number, String, TSchema, TString } from '@sinclair/typebox';
import { CheckingType } from '../Operator';

export const message = String();
export type ErrorDefs = Record<string, Record<string, TSchema> & { message?: TString }>;
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
	ActParsingError: {
		message,
	},
	GroupsPostFormatError: {
		content: String(),
	},
	WrongInfoNumberOfGroupLine: {
		line: String(),
		number: Number(),
		lineNumber: Number(),
	},
	CannotParseGroupExpr: {
		message,
		interval: Any(),
	},
	NoAsserter: {
		checkingType: Enum(CheckingType),
	},
} satisfies ErrorDefs;
