/**
 * 自然评论解析器
 * @license AGPL-3.0-or-later
 */
declare module '.';

import { Comment } from '../CnbApi';
import getGroupExpr from './groupExpr';
import Act from './Act';

export * from './Act';
export * from './groupExpr';
export { Act, getGroupExpr };

export default async function parseComment(comment: Comment) {
	const act = new Act(comment);
	return act;
}
