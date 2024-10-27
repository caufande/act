/**
 * 自然评论解析器
 * @license AGPL-3.0-or-later
 */
declare module '.';

import { Comment } from '../CnbApi';
import Act from './Act';

export * from './Act';
export { Act };

export default async function parseComment(comment: Comment) {
	const act = new Act(comment);
	return act;
}
