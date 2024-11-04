/**
 * 用户组工厂函数
 * @license AGPL-3.0-or-later
 */
declare module './getGroups';

import { JSONContent } from 'html-to-json-parser/dist/types';
import { throwError } from '../errors';
import { postHtmlToJson } from '../util';
import Groups from './Groups';

export default async function getGroups(postHtml: string) {
	const json = await postHtmlToJson(postHtml);
	const sheet = ((json.content.at(-1) as JSONContent)?.content?.at(0) as JSONContent)?.content?.at(0);
	if (typeof sheet !== 'string') throwError('GroupsPostFormatError', { content: postHtml });
	return new Groups(sheet);
}

