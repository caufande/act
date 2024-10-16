/**
 * 错误信息翻译
 * @license GPL-2.0-or-later
 */
declare module './names';

import { ErrorType } from '.';
import { Lang, LangMap } from '../lang';
import Operator from '../Operator';

type ErrorNames = Record<ErrorType, LangMap>;

export function getTip(operator: Operator, errorType: ErrorType) {
	return `${operator.l10n(errorName)} - ${operator.l10n(errorNames[errorType])}`;
}

export const errorName: LangMap = {
	'*': Lang.zh,
	[Lang.zh]: '博客园评论编译错误',
};

export const errorNames: ErrorNames = {
	WrongBigTitle: {
		'*': Lang.zh,
		[Lang.zh]: '大标题格式错误，无法判断活动名称',
	},
	NoTitle: {
		'*': Lang.zh,
		[Lang.zh]: '没有标题，无法判断活动名称',
	},
};
