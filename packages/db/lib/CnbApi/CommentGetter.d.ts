/**
 * 评论获取处理相关
 * @license GPL-2.0-or-later
 */
declare module './CommentGetter';
import { Static } from '@sinclair/typebox';
import { Requester } from '../Operator';
declare const CommentOrigin: import("@sinclair/typebox").TObject<{
    Id: import("@sinclair/typebox").TNumber;
    Body: import("@sinclair/typebox").TString;
    Author: import("@sinclair/typebox").TString;
    AuthorUrl: import("@sinclair/typebox").TString;
    FaceUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    Floor: import("@sinclair/typebox").TNumber;
    DateAdded: import("@sinclair/typebox").TString;
}>;
export type CommentOrigin = Static<typeof CommentOrigin>;
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
    protected readonly requesterPromise: Promise<Requester>;
    readonly blogApp: string;
    readonly postId: number;
    readonly pageSize: number;
    constructor(requesterPromise: Promise<Requester>, blogApp: string, postId: number, pageSize?: number);
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
export {};
