/**
 * 用户组相关
 * @license AGPL-3.0-or-later
 */
declare module './Groups';

import { throwError } from '../errors';

export interface Group {
	readonly dads: readonly string[];
	readonly tags: readonly string[];
	readonly hash: string | null;
}

export enum ArraySpliter {
	First = ',',
	Second = '|',
};

function parseSecArr(text: string): readonly string[] {
	return text ? text.split(ArraySpliter.Second) : [];
}

export default class Groups extends Map<string, Group> {
	constructor(sheet: string) {
		super();
		sheet.split('\n').forEach((line, idx) => line && this.parseLine(line, idx + 1));
	}

	parseLine(line: string, lineNumber: number) {
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
		this.set(name, group);
	}
}
