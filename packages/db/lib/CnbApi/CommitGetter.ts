/**
 * 评论获取处理相关
 */
declare module './CommitGetter';

import { decodeHTML } from 'entities';
import Requester, { Method } from '../Requester';
import { safeRequest } from '../util';

interface CommitOrigin {
	/**编号 */
	Id: number;
	/**内容 */
	Body: string;
	/**作者 */
	Author: string;
	/**作者链接 */
	AuthorUrl: string;
	/**头像链接 */
	FaceUrl: string;
	/**楼层，倒序，从 1 开始数起 */
	Floor: number;
	/**添加时间 */
	DateAdded: string;
}
export interface Commit {
	id: number;
	body: string;
	author: string;
	authorUrl: string;
	faceUrl: string;
	floor: number;
	dateAdded: Date;
}

function toCommit({
	Id,
	Body,
	Author,
	AuthorUrl,
	FaceUrl,
	Floor,
	DateAdded,
}: CommitOrigin): Commit {
	Body = Body.slice(Body.indexOf('>') + 1, Body.lastIndexOf('<'));
	return {
		id: Id,
		body: decodeHTML(Body),
		author: Author,
		authorUrl: AuthorUrl,
		faceUrl: FaceUrl,
		floor: Floor,
		dateAdded: new Date(DateAdded),
	};
};
export default class CommitGetter {
	constructor(
		protected readonly requesterPromise: Promise<Requester>,
		readonly blogApp: string,
		readonly postId: number,
		readonly pageSize = 50,
	) {	}

	requested = false;
	protected pageNext = 1;
	protected pointer = 0;
	protected readonly cache: Commit[] = [];
	async requestNextPage(): Promise<Commit[]> {
		if (this.requested) return [];
		const requester = await this.requesterPromise;
		const data: CommitOrigin[] = await safeRequest(requester.send({
			method: Method.GET,
			url: `https://api.cnblogs.com/api/blogs/${this.blogApp}/posts/${this.postId}/comments?pageIndex=${this.pageNext}&pageSize=${this.pageSize}`,
		}));
		if (data.length === 0 || data.at(-1)?.Floor === 1) this.requested = true;
		this.pageNext++;
		const page = data.map(toCommit);
		page.forEach(n => {
			this.cache[n.floor] = n;
		});
		this.pointer = page[0]?.floor ?? 0;
		return page;
	}

	[Symbol.asyncIterator]() {
		const _this = this;
		return {
			async next() {
				const value = _this.cache[--_this.pointer] ?? (await _this.requestNextPage()).at(0);
				const done = !value;
				return { value, done };
			},
		};
	}
	async getAll() {
		return Array.fromAsync(this);
	}
}
