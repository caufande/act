/**
 * 错误信息翻译
 * @license GPL-2.0-or-later
 */
declare module './names';

import { ErrorType } from '.';
import { Lang, LangMap } from '../lang';
import { getOperator } from '../Operator';

type ErrorNames = Record<ErrorType, LangMap>;

export function getTip(errorType: ErrorType) {
	const operator = getOperator();
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
	TooManyDatesInACommentLine: {
		'*': Lang.zh,
		[Lang.zh]: '一行中包含太多（三个）日期，导致无法理解日期时段',
	},
	NoComment: {
		'*': Lang.zh,
		[Lang.zh]: '找不到这一层评论，可能是数据已经被删除',
	},
};
