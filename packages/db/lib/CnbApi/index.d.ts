/**
 * 博客 API 相关
 * @license GPL-2.0-or-later
 */
declare module '.';
import { Requester } from '../Operator';
import CommentGetter from './CommentGetter';
export * from './CommentGetter';
export { CommentGetter };
export interface CnbConfig {
    id: string;
    secret: string;
}
export default class CnbApi {
    protected readonly config: CnbConfig;
    static readonly baseHeader: {
        'content-type': string;
    };
    protected readonly requesterPromise: Promise<Requester>;
    constructor(config: CnbConfig);
    protected login(requester: Requester): Promise<Requester>;
    getPost(postId: number): Promise<string>;
    getCommentGetter(blogApp: string, postId: number, pageSize?: number): CommentGetter;
}
