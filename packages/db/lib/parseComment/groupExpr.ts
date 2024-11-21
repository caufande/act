/**
 * 用户组表达式相关
 * @license AGPL-3.0-or-later
 */
declare module './groupExpr';

import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { throwError } from '../errors';
import groupArrxprGramm, { GroupExprActionDict } from './group-expr.ohm-bundle.cjs';

export enum Operation {
	And,
	Or,
	Not,
}

export type BinOperationArr = readonly [Operation.And | Operation.Or, GroupExpr, GroupExpr];
export type NotArr = readonly [Operation.Not, GroupExpr];
export type GroupExpr = BinOperationArr | NotArr | string;

export const GroupExpr = Type.Union([Type.String(), Type.Any(), Type.Any()]);
const BinOperationArr = Type.Tuple([Type.Enum(Operation), GroupExpr, GroupExpr]);
const NotArr = Type.Tuple([Type.Enum(Operation), GroupExpr]);
GroupExpr.anyOf[1] = BinOperationArr as any;
GroupExpr.anyOf[2] = NotArr as any;

export function assertGroupExpr(n: unknown): asserts n is GroupExpr {
	return Value.Assert(GroupExpr, n);
}

function resOpArr(op: Operation.And | Operation.Or, arr: any): BinOperationArr | string {
	const n = arr.pop();
	if (arr.length === 0) return n.getTester();
	return [op, n.getTester(), resOpArr(op, arr)];
}
const parseOpObj: GroupExprActionDict<GroupExpr> = {
	ExprOr(a, _, c) {
		return resOpArr(Operation.Or, [a, ...c.children]);
	},
	ExprAnd(a, _, c) {
		return resOpArr(Operation.And, [a, ...c.children]);
	},
	Quoted(_a, n, _b) {
		return n.getTester();
	},
	Term_not(_, n) {
		return [Operation.Not, n.getTester()];
	},
	groupName(n) {
		return n.sourceString;
	},
};
const groupExprSemantics = groupArrxprGramm.createSemantics();
groupExprSemantics.addOperation('getTester', parseOpObj);

export default function getGroupExpr(n: string | readonly string[]): GroupExpr {
	if (typeof n !== 'string') n = '(' + n.join(')|(') + ')';
	const matched = groupArrxprGramm.match(n);
	if (matched.failed()) throwError('CannotParseGroupExpr', { interval: matched.getInterval(), message: matched.message! });
	return groupExprSemantics(matched).getTester();
}

