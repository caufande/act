/**
 * 评论获取处理相关
 * @license GPL-2.0-or-later
 */
declare module './CommentGetter';

import { decodeHTML } from 'entities';
import { Requester, Method } from '../Operator';
import { calcPageNum, calcWhichPage, safeRequest } from './util';
import { lowerFirst } from '../util';

export interface CommentOrigin {
	Id: number;
	Body: string;
	Author: string;
	AuthorUrl: string;
	FaceUrl: string | null;
	Floor: number;
	DateAdded: string;
}
export class Comment {
	/**编号 */
	readonly id!: number;
	/**内容 */
	readonly body!: string;
	/**作者 */
	readonly author!: string;
	/**作者链接 */
	readonly authorUrl!: string;
	/**头像链接 */
	readonly faceUrl!: string | null;
	/**楼层，倒序，从 1 开始数起 */
	readonly floor!: number;
	/**添加时间 */
	readonly dateAdded!: Date;
	constructor(commentOrigin: CommentOrigin) {
		// @ts-ignore
		Object.keys(commentOrigin).forEach(n => this[lowerFirst(n)] = commentOrigin[n]);
		this.body = decodeHTML(this.body);
		this.dateAdded = new Date(this.dateAdded);
	};
}


export default class CommentGetter {
	constructor(
		protected readonly requesterPromise: Promise<Requester>,
		readonly blogApp: string,
		readonly postId: number,
		readonly pageSize = 50,
	) {	}

	protected readonly cache: (readonly Comment[])[] = [];
	async getPage(index: number): Promise<readonly Comment[]> {
		if (this.cache[index]) return this.cache[index];
		const requester = await this.requesterPromise;
		const data: CommentOrigin[] = await safeRequest(requester.send({
			method: Method.GET,
			url: `https://api.cnblogs.com/api/blogs/${this.blogApp}/posts/${this.postId}/comments?pageIndex=${index}&pageSize=${this.pageSize}`,
		}));
		const page = data.map(n => new Comment(n));
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