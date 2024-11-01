/**
 * 活动类定义
 * @license AGPL-3.0-or-later
 */
declare module './Act';

import { Static, Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { Comment } from '../CnbApi';
import { throwError } from '../errors';
import { parse } from './act-parser';
import { GroupExpr } from './groupExpr';

export interface Stage {
	/**
	 * 内容名称
	 */
	readonly name: string;
	/**
	 * 活动时间
	 *
	 * 例如 2024 年 9 月 1 日到 2024 年 9 月 10 日，中间扣掉 9 月 3 日，即表示为
	 * [[2024, 9, 1], [2024, 9, 2], [2024, 9, 4], [2024, 9, 10]]
	 *
	 * @minItems 1
	 */
	readonly timeSteps: readonly (readonly [Date, Date])[];
	/**
	 * 活动的描述
	 */
	readonly details: readonly string[];
}
export const Stage = Type.Object({
	name: Type.String({ default: '' }),
	timeSteps: Type.Array(Type.Tuple([Type.Date(), Type.Date()]), { default: [] }),
	details: Type.Array(Type.String(), { default: [] }),
});
Value.Create(Stage) satisfies Stage;

export interface Detail {
	readonly title: string;
	readonly strings: readonly string[];
	readonly details: readonly Detail[];
}
export const Detail = Type.Object({
	title: Type.String(),
	strings: Type.Array(Type.String()),
	details: Type.Any(),
});
(Detail.properties.details as any) = Type.Array(Detail);
Value.Create(Detail) satisfies Detail;

export interface ActParsed {
	readonly title: string;
	readonly detail: Detail;
	readonly groups: GroupExpr;
	readonly stages: readonly Stage[];
}
export const ActParsed = Type.Object({
	title: Type.String(),
	detail: Detail,
	groups: Type.Any(),
	stages: Type.Array(Stage),
});
Value.Create(ActParsed) satisfies ActParsed;

/**
 * 项目具体数据
 */
export default class Act implements ActParsed {
	static tSchema = Type.Composite([ActParsed, Type.Object({
		floor: Type.Number(),
		id: Type.Number(),
		author: Type.String(),
		authorUrl: Type.String(),
	})]);
	static _ = Value.Create(Act.tSchema) satisfies Act;
	static assert(n: unknown): asserts n is Act {
		Value.Assert(Act.tSchema, n);
	}
	static deserializer(n: any): Act {
		const a = n as Act;
		a.stages.forEach(n => (n.timeSteps as any) = n.timeSteps.map(([a, b]) => [new Date(a), new Date(b)]));
		return n;
	}

	protected static ParserError = Type.Object({
		format: Type.Function([
			Type.Array(Type.Object({
				source: Type.String(),
				text: Type.String(),
			})),
		], Type.String()),
	});
	protected static isParserError(n: unknown): n is Static<typeof Act.ParserError> {
		return Value.Check(Act.ParserError, n);
	}

	readonly title!: string;
	readonly detail!: Detail;
	/**
	 * 活动具体内容
	 *
	 * @minItems 1
	 */
	readonly stages!: readonly Stage[];
	readonly groups!: GroupExpr;

	readonly floor!: number;
	readonly id!: number;
	readonly author!: string;
	readonly authorUrl!: string;

	constructor({ floor, id, author, authorUrl, body }: Comment) {
		const fileName = `第 ${floor} 层评论`;
		try {
			const actParsed: any = parse(body, { grammarSource: fileName, floor });
			console.log(actParsed);
			Value.Assert(ActParsed as any, actParsed);
			actParsed.floor = floor;
			actParsed.id = id;
			actParsed.author = author;
			actParsed.authorUrl = authorUrl;
			return actParsed;
		} catch (err) {
			if (!Act.isParserError(err)) throw err;
			throwError('ActParsingError', {
				message: err.format([
					{ source: fileName, text: body },
				]),
			});
		}
	}
}
