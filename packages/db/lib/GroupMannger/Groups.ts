/**
 * 用户组相关
 * @license AGPL-3.0-or-later
 */
declare module './Groups';

import { Type } from '@sinclair/typebox';
import { throwError } from '../errors';
import { Value } from '@sinclair/typebox/value';

export interface Group {
	readonly dads: readonly string[];
	readonly tags: readonly string[];
	readonly hash: string | null;
}
export const Group = Type.Object({
	dads: Type.Array(Type.String()),
	tags: Type.Array(Type.String()),
	hash: Type.Union([Type.Null(), Type.String()]),
});
Value.Create(Group) satisfies Group;

export enum ArraySpliter {
	First = ',',
	Second = '|',
};

function parseSecArr(text: string): readonly string[] {
	return text ? text.split(ArraySpliter.Second) : [];
}

type SerializedGroup = readonly [
	name: string,
	dads: readonly string[],
	tags: readonly string[],
	hash: string | null,
];
type SerializedGroups = SerializedGroup[];
export default class Groups extends Map<string, Group> {
	static assert(n: unknown): asserts n is Groups {
		if (!(n instanceof Map)) throw Error('not map', { cause: n });
		n.forEach((v, k) => {
			Value.Assert(Type.String(), k);
			Value.Assert(Group, v);
		});
	}
	static serializer(n: Groups): SerializedGroups {
		return Array.from(n).map(([name, { dads, tags, hash }]): SerializedGroup => [name, dads, tags, hash]);
	}
	static deserializer(n: SerializedGroups): Groups {
		const groups = new Groups();
		n.forEach(([name, dads, tags, hash]) => groups.set(name, { dads, tags, hash }));
		return groups;
	}

	constructor(sheet: string | null = null) {
		super();
		if (sheet !== null) this.parse(sheet);
	}

	parse(sheet: string) {
		sheet.split('\n').forEach((line, idx) => line && this.parseLine(line, idx + 1));
	}

	protected parseLine(line: string, lineNumber: number) {
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
