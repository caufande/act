import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { getOperator } from '../Operator';
import CommentGetter from './CommentGetter';
export * from './CommentGetter';
export { CommentGetter };
export default class CnbApi {
    config;
    static baseHeader = { 'content-type': 'application/x-www-form-urlencoded' };
    requesterPromise;
    constructor(config) {
        this.config = config;
        const requester = new (getOperator().requesterIniter)(CnbApi.baseHeader);
        this.requesterPromise = this.login(requester);
    }
    async login(requester) {
        const body = await requester.easyRequest({
            method: "POST" /* Method.POST */,
            url: 'https://api.cnblogs.com/token',
            data: {
                client_id: this.config.id,
                client_secret: this.config.secret,
                grant_type: 'client_credentials',
            },
        }, Type.Object({ access_token: Type.String() }));
        Value.Assert(Type.Object({ access_token: Type.String() }), body);
        requester.baseHeader.authorization = `Bearer ${body.access_token}`;
        return requester;
    }
    async getPost(postId) {
        const requester = await this.requesterPromise;
        const body = await requester.easyRequest({
            method: "GET" /* Method.GET */,
            url: `https://api.cnblogs.com/api/blogposts/${postId}/body`,
        }, Type.String());
        return body;
    }
    getCommentGetter(blogApp, postId, pageSize) {
        return new CommentGetter(this.requesterPromise, blogApp, postId, pageSize);
    }
}
