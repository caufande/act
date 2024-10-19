/**
 * 活动类定义
 * @license GPL-2.0-or-later
 */
declare module './Act';

import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { JSONContent } from 'html-to-json-parser/dist/types';
import { Comment } from '../CnbApi';
import { getText, parseDate } from './parseDate';

export const Stage = Type.Object({
	name: Type.String(),
	timeStep: Type.Array(Type.Tuple([Type.Date(), Type.Date()])),
	detail: Type.Array(Type.String()),
});
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
	readonly timeStep: readonly (readonly [Date, Date])[];
	/**
	 * 活动的描述
	 */
	readonly detail: readonly string[];
}

export interface Detail {
	readonly title: string;
	readonly contentString: string;
	readonly contentDetails: readonly Detail[];
}

/**
 * 项目具体数据
 */
export default class Act {
	protected static assertDetail(n: unknown): asserts n is Detail {
		const Detail = Type.Object({
			title: Type.String(),
			contentString: Type.String(),
			contentDetails: null as any,
		});
		Detail.properties.contentDetails = Type.Array(Detail);
		Value.Assert(Detail, n);
	}
	static assert(n: unknown): asserts n is Act {
		Value.Assert(Type.Object({
			floor: Type.Number(),
			title: Type.String(),
			author: Type.String(),
			authorUrl: Type.String(),
			detail: Type.Any(),
			stages: Type.Array(Stage),
		}), n);
		this.assertDetail(n.detail);
	}

	/**
	 * 项目编号
	 */
	readonly floor: number;
	/**
	 * 项目名称
	 */
	readonly title: string;
	readonly author: string;
	readonly authorUrl: string;
	/**
	 * 项目介绍
	 */
	readonly detail: Detail = {} as any;
	/**
	 * 活动具体内容
	 *
	 * @minItems 1
	 */
	readonly stages: readonly Stage[] = [{} as any];
	protected parsingStage = false;
	constructor({ floor, author, authorUrl }: Comment, json: JSONContent) {
		this.floor = floor;
		this.author = author;
		this.authorUrl = authorUrl;
		const titles: string[] = [];
		for (const ele of json.content as JSONContent[]) {
			switch (ele.type) {
				case 'h1':
					titles.push(getText(ele));
					continue;
				case 'h2':
					this.parsingStage = this.parsingStage || getText(ele).includes('时间安排');
					break;
			}
			// this.parsingStage ? this.parseStage(ele) : this.parseDetail(ele);
			if (this.parsingStage) this.parseStage(ele);
		}
		this.title = titles.join(' ');
	}

	private stageNow: { -readonly [I in keyof Stage]: Stage[I]; } = this.stages[0];
	protected parseStage(ele: JSONContent) {
		switch (ele.type) {
			case 'h2': break;
			case 'h3':
				if ('name' in this.stageNow) (this.stages as any).push(this.stageNow = { name: '', timeStep: [], detail: [] });
				this.stageNow.name = getText(ele);
				this.stageNow.timeStep = [];
				break;
			case 'p':
				if (this.stageNow.timeStep?.length !== 0) (this.stageNow.detail as any).push(getText(ele));
				else {
					const dateRange = parseDate(getText(ele), this.floor);
					this.stageNow.timeStep = this.stageNow.timeStep?.concat(dateRange);
				}
				break;
		}
	}

	// private detailNow: { -readonly [I in keyof Detail]?: Detail[I]; } = {};
	// protected parseDetail(ele: JSONContent) {
	// 	1 + 1;
	// }
}
