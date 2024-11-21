/**
 * 评论获取处理相关
 * @license AGPL-3.0-or-later
 */
declare module './CommentGetter';
import CnbApi, { CnbConfig, CommentOrigin } from '.';
export declare class Comment {
    /**编号 */
    readonly id: number;
    /**内容 */
    readonly body: string;
    /**作者 */
    readonly author: string;
    /**作者链接 */
    readonly authorUrl: string;
    /**头像链接 */
    readonly faceUrl: string | null;
    /**楼层，倒序，从 1 开始数起 */
    readonly floor: number;
    /**添加时间 */
    readonly dateAdded: Date;
    constructor(commentOrigin: CommentOrigin);
}
export default class CommentGetter {
    readonly cnbApi: CnbApi;
    readonly postId: number;
    readonly pageSize: number;
    protected readonly config: CnbConfig;
    constructor(cnbApi: CnbApi, postId: number, pageSize?: number);
    protected readonly cache: (readonly Comment[])[];
    getPage(index: number): Promise<readonly Comment[]>;
    private total;
    count(): Promise<number>;
    getFloor(index: number): Promise<Comment | undefined>;
    [Symbol.asyncIterator](): {
        next(): Promise<{
            value: Comment | undefined;
            done: boolean;
        }>;
    };
    getAll(): Promise<Comment[]>;
}
