import { lowerFirst } from '../util';
import { calcPageNum, calcWhichPage } from './util';
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
        this.dateAdded = new Date(this.dateAdded);
    }
    ;
}
export default class CommentGetter {
    cnbApi;
    postId;
    pageSize;
    config;
    constructor(cnbApi, postId, pageSize = 50) {
        this.cnbApi = cnbApi;
        this.postId = postId;
        this.pageSize = pageSize;
        this.config = cnbApi.config;
    }
    cache = [];
    async getPage(index) {
        if (this.cache[index])
            return this.cache[index];
        const data = await this.cnbApi.getCommentPage(this.postId, index, this.pageSize);
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
