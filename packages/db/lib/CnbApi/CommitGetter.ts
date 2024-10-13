/**
 * 评论获取处理相关
 * @license GPL-2.0-or-later
 */
declare module './CommitGetter';

import { decodeHTML } from 'entities';
import Requester, { Method } from '../Requester';
import { calcPageNum, calcWhichPage, safeRequest } from './util';

export interface CommitOrigin {
	/**编号 */
	Id: number;
	/**内容 */
	Body: string;
	/**作者 */
	Author: string;
	/**作者链接 */
	AuthorUrl: string;
	/**头像链接 */
	FaceUrl: string | null;
	/**楼层，倒序，从 1 开始数起 */
	Floor: number;
	/**添加时间 */
	DateAdded: string;
}
export class Commit {
	readonly id: number;
	readonly body: string;
	readonly author: string;
	readonly authorUrl: string;
	readonly faceUrl: string | null;
	readonly floor: number;
	readonly dateAdded: Date;
	constructor({
		Id,
		Body,
		Author,
		AuthorUrl,
		FaceUrl,
		Floor,
		DateAdded,
	}: CommitOrigin) {
		Body = Body.slice(Body.indexOf('>') + 1, Body.lastIndexOf('<'));
		this.id = Id;
		this.body = decodeHTML(Body);
		this.author = Author;
		this.authorUrl = AuthorUrl;
		this.faceUrl = FaceUrl;
		this.floor = Floor;
		this.dateAdded = new Date(DateAdded);
	};
}


export default class CommitGetter {
	constructor(
		protected readonly requesterPromise: Promise<Requester>,
		readonly blogApp: string,
		readonly postId: number,
		readonly pageSize = 50,
	) {	}

	protected readonly cache: (readonly Commit[])[] = [];
	async getPage(index: number): Promise<readonly Commit[]> {
		if (this.cache[index]) return this.cache[index];
		const requester = await this.requesterPromise;
		const data: CommitOrigin[] = await safeRequest(requester.send({
			method: Method.GET,
			url: `https://api.cnblogs.com/api/blogs/${this.blogApp}/posts/${this.postId}/comments?pageIndex=${index}&pageSize=${this.pageSize}`,
		}));
		const page = data.map(n => new Commit(n));
		return this.cache[index] = page;
	}

	private total: null | number = null;
	async count() {
		return this.total ?? (this.total = (await this.getPage(1)).at(0)?.floor ?? 0);
	}

	async getFloor(index: number) {
		const { pageIndex, eleIndex } = calcWhichPage(index, await this.count(), this.pageSize);
		return (await this.getPage(pageIndex)).at(eleIndex);
	}

	[Symbol.asyncIterator]() {
		const _this = this;
		let pointer = 0;
		return {
			async next() {
				return pointer === await _this.count()
					? { value: void 0, done: true }
					: { value: await _this.getFloor(++pointer), done: false };
			},
		};
	}

	async getAll() {
		const pageNum = calcPageNum(await this.count(), this.pageSize);
		await Promise.allSettled(Array(pageNum - 1).fill(2)
			.map((n, i) => this.getPage(i + n)));
		return this.cache.flat().reverse();
	}
}
