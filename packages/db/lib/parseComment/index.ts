/**
 * 自然评论解析器
 * @license GPL-2.0-or-later
 */
declare module '.';

import { HTMLToJSON } from 'html-to-json-parser';
import { JSONContent } from 'html-to-json-parser/dist/types';
import { Comment } from '../CnbApi';
import { removeBlankBetweenAttr } from '../util';
import { Act } from './Act';

export default async function parseComment(comment: Comment) {
	const html = removeBlankBetweenAttr(`<div>${comment.body}</div>`);
	const json = await HTMLToJSON(html) as JSONContent;
	const act = new Act(comment, json);
	return act;
}
