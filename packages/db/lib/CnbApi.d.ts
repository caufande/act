/**
 * 博客 API 相关
 */
declare module './CnbApi';
import { RequesterIniter } from './Requester';
export interface CnbConfig {
    id: string;
    secret: string;
}
export default class CnbApi {
    private readonly config;
    static readonly baseHeader: {
        'content-type': string;
    };
    private readonly requesterPromise;
    constructor(requesterIniter: RequesterIniter, config: CnbConfig);
    private login;
    private safeRequest;
    getPost(postId: number): Promise<string>;
}
