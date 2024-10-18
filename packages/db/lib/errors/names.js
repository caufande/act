import { Lang } from '../lang';
import { getOperator } from '../Operator';
export function getTip(errorType) {
    const operator = getOperator();
    return `${operator.l10n(errorName)} - ${operator.l10n(errorNames[errorType])}`;
}
export const errorName = {
    '*': Lang.zh,
    [Lang.zh]: '博客园评论编译错误',
};
export const errorNames = {
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
};
