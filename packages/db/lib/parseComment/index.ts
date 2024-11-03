/**
 * 自然评论解析器
 * @license AGPL-3.0-or-later
 */
declare module '.';

import { Comment } from '../CnbApi';
import getGroupExpr from './groupExpr';
import Act from './Act';
import { Value } from '@sinclair/typebox/value';

export * from './Act';
export * from './groupExpr';
export { Act, getGroupExpr };

export interface parseCommentOption {
	check?: boolean;
}
export default function parseComment(comment: Comment, option: parseCommentOption = {}) {
	const {
		check = false,
	} = option;
	const act = new Act(comment);
	if (check) Value.Assert(Act.tSchema, act);
	return act;
}
