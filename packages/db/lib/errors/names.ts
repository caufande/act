/**
 * 错误信息翻译
 * @license AGPL-3.0-or-later
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
	[Lang.zh]: '运行时错误，请寻找管理员',
};

function m(...args: readonly string[]) {
	return args.join('\n');
}

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
	NoUser: {
		'*': Lang.zh,
		[Lang.zh]: m(
			'提供的 CnbConfig 里没有 MetaWeblog 用户名。',
			'如果你真的不用用户也能登录，请联系我对此修复',
		),
	},
	NoPassword: {
		'*': Lang.zh,
		[Lang.zh]: m(
			'提供的 CnbConfig 里没有 MetaWeblog 用户密码。',
			'如果你真的不用密码也能登录，请联系我对此修复',
		),
	},
	NoClientId: {
		'*': Lang.zh,
		[Lang.zh]: m(
			'提供的 CnbConfig 里没有 API 的 ID ，无法得到 Token 来请求 API。',
			'如果你是开发者且不知道这是什么，请去 https://oauth.cnblogs.com/ 进行申请',
		),
	},
	NoClientSecret: {
		'*': Lang.zh,
		[Lang.zh]: m(
			'提供的 CnbConfig 里没有 API 的 Secret ，无法得到 Token 来请求 API',
			'如果你是开发者且不知道这是什么，请去 https://oauth.cnblogs.com/ 进行申请',
		),
	},
	ActParsingError: {
		'*': Lang.zh,
		[Lang.zh]: '活动对应的评论解析错误',
	},
	GroupsPostFormatError: {
		'*': Lang.zh,
		[Lang.zh]: '用户组博客内容有误',
	},
	WrongInfoNumberOfGroupLine: {
		'*': Lang.zh,
		[Lang.zh]: '一条用户组记录中的字段数量错误',
	},
	CannotParseGroupExpr: {
		'*': Lang.zh,
		[Lang.zh]: '解析用户组表达式失败',
	},
};
