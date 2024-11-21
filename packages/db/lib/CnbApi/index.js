/// <reference path="../../types/xmlrpc-parser.d.ts" />
import { Type } from '@sinclair/typebox';
import { XmlRpcMessage } from 'xmlrpc-parser';
import { throwError } from '../errors';
import { getOperator } from '../Operator';
import CommentGetter from './CommentGetter';
export * from './CommentGetter';
export { CommentGetter };
const CommentOrigin = Type.Object({
    Id: Type.Number(),
    Body: Type.String(),
    Author: Type.String(),
    AuthorUrl: Type.String(),
    FaceUrl: Type.Union([Type.String(), Type.Null()]),
    Floor: Type.Number(),
    DateAdded: Type.String(),
});
export default class CnbApi {
    config;
    static XmlSuccess = Type.Object({
        name: Type.Const('methodResponse'),
        children: Type.Array(Type.Object({
            name: Type.Const('params'),
            children: Type.Array(Type.Object({
                name: Type.Const('param'),
                children: Type.Array(Type.Object({
                    name: Type.Const('value'),
                    children: Type.Array(Type.Object({
                        name: Type.Const('boolean'),
                        value: Type.Const('1'),
                    })),
                })),
            })),
        })),
    });
    requester;
    constructor(config) {
        this.config = config;
        this.requester = new (getOperator().requesterIniter)();
    }
    static baseApiHeader = {
        'content-type': 'application/x-www-form-urlencoded',
    };
    async getApiHeader(header = {}) {
        return {
            ...CnbApi.baseApiHeader,
            authorization: await this.login(),
            ...header,
        };
    }
    expiresDate = null;
    authorizationStr = '';
    async login() {
        if (this.expiresDate && new Date() < this.expiresDate)
            return this.authorizationStr;
        const data = {
            client_id: this.config.id ?? throwError('NoClientId', { cnbConfig: this.config }),
            client_secret: this.config.secret ?? throwError('NoClientSecret', { cnbConfig: this.config }),
            grant_type: 'client_credentials',
        };
        const body = await this.requester.easyRequest({
            method: "POST" /* Method.POST */,
            url: 'https://api.cnblogs.com/token',
            data,
            header: CnbApi.baseApiHeader,
        }, Type.Object({
            access_token: Type.String(),
            expires_in: Type.Number(),
        }));
        this.expiresDate = new Date(body.expires_in);
        return this.authorizationStr = `Bearer ${body.access_token}`;
    }
    async getPost(postId) {
        const body = await this.requester.easyRequest({
            method: "GET" /* Method.GET */,
            url: `https://api.cnblogs.com/api/blogposts/${postId}/body`,
            header: await this.getApiHeader(),
        }, Type.String());
        return body;
    }
    async getCommentPage(postId, index, pageSize) {
        const data = await this.requester.easyRequest({
            method: "GET" /* Method.GET */,
            url: `https://api.cnblogs.com/api/blogs/${this.config.blogApp}/posts/${postId}/comments?pageIndex=${index}&pageSize=${pageSize}`,
            header: await this.getApiHeader(),
        }, Type.Array(CommentOrigin));
        return data;
    }
    getCommentGetter(postId, pageSize) {
        return new CommentGetter(this, postId, pageSize);
    }
    static baseXmlHeader = {
        'content-type': 'text/xml',
    };
    getXmlHeader(n = {}) {
        return {
            ...CnbApi.baseXmlHeader,
            ...n,
        };
    }
    xml(methodName, params) {
        return new XmlRpcMessage(methodName, params).xml();
    }
    async editPost(postId, post, publish = true) {
        const user = this.config.user ?? throwError('NoUser', { cnbConfig: this.config });
        const password = this.config.password ?? throwError('NoPassword', { cnbConfig: this.config });
        const xml = this.xml('metaWeblog.editPost', [postId, user, password, post, publish]);
        await this.requester.easyRequest({
            method: "POST" /* Method.POST */,
            url: `https://rpc.cnblogs.com/metaweblog/${this.config.blogApp}`,
            data: xml,
            header: { 'content-type': 'text/xml' },
        }, CnbApi.XmlSuccess);
        return true;
    }
}
