import { Type } from '@sinclair/typebox';
import { decodeHTML } from 'entities';
import { lowerFirst } from '../util';
import { calcPageNum, calcWhichPage } from './util';
const CommentOrigin = Type.Object({
    Id: Type.Number(),
    Body: Type.String(),
    Author: Type.String(),
    AuthorUrl: Type.String(),
    FaceUrl: Type.Union([Type.String(), Type.Null()]),
    Floor: Type.Number(),
    DateAdded: Type.String(),
});
export class Comment {
    /**编号 */
    id;
    /**内容 */
    body;
    /**作者 */
    author;
    /**作者链接 */
    authorUrl;
    /**头像链接 */
    faceUrl;
    /**楼层，倒序，从 1 开始数起 */
    floor;
    /**添加时间 */
    dateAdded;
    constructor(commentOrigin) {
        // @ts-ignore
        Object.keys(commentOrigin).forEach(n => this[lowerFirst(n)] = commentOrigin[n]);
        this.body = decodeHTML(this.body);
        this.dateAdded = new Date(this.dateAdded);
    }
    ;
}
export default class CommentGetter {
    requesterPromise;
    blogApp;
    postId;
    pageSize;
    constructor(requesterPromise, blogApp, postId, pageSize = 50) {
        this.requesterPromise = requesterPromise;
        this.blogApp = blogApp;
        this.postId = postId;
        this.pageSize = pageSize;
    }
    cache = [];
    async getPage(index) {
        if (this.cache[index])
            return this.cache[index];
        const requester = await this.requesterPromise;
        const data = await requester.easyRequest({
            method: "GET" /* Method.GET */,
            url: `https://api.cnblogs.com/api/blogs/${this.blogApp}/posts/${this.postId}/comments?pageIndex=${index}&pageSize=${this.pageSize}`,
        }, Type.Array(CommentOrigin));
        const page = data.map(n => new Comment(n));
        return this.cache[index] = page;
    }
    total = null;
    async count() {
        return this.total ?? (this.total = (await this.getPage(1)).at(0)?.floor ?? 0);
    }
    async getFloor(index) {
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
