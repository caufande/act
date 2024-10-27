/**
 * 用户组相关
 * @license AGPL-3.0-or-later
 */
declare module './parseGroups';

import { JSONContent } from 'html-to-json-parser/dist/types';
import { postHtmlToJson } from '../util';
import { throwError } from '../errors';

export interface Group {
	readonly dads: readonly string[];
	readonly tags: readonly string[];
	readonly hash: string | null;
}
export type Groups = Map<string, Group>;

export enum ArraySpliter {
	First = ',',
	Second = '|',
};

function parseSecArr(text: string): readonly string[] {
	return text ? text.split(ArraySpliter.Second) : [];
}

function parseLine(line: string, lineNumber: number, groups: Groups) {
	const blocks = line.split(ArraySpliter.First);
	if (blocks.length !== 4) {
		throwError('WrongInfoNumberOfGroupLine', { number: blocks.length, line, lineNumber });
	}
	const [name, dadsStr, tagsStr, hash] = blocks;
	const group: Group = {
		dads: parseSecArr(dadsStr),
		tags: parseSecArr(tagsStr),
		hash: hash ? hash : null,
	};
	groups.set(name, group);
}

export default async function parseGroups(postHtml: string) {
	const json = await postHtmlToJson(postHtml);
	const sheet = ((json.content.at(-1) as JSONContent)?.content?.at(0) as JSONContent)?.content?.at(0);
	if (typeof sheet !== 'string') throwError('GroupsPostFormatError', { content: postHtml });
	const groups: Groups = new Map();
	sheet.split('\n').forEach((line, idx) => line && parseLine(line, idx + 1, groups));
	return groups;
}
