/**
 * 博客 API 相关
 * @license GPL-2.0-or-later
 */
declare module '.';

import { Type } from '@sinclair/typebox';
import Operator, { Method, Requester } from '../Operator';
import CommentGetter from './CommentGetter';
import { safeRequest } from './util';
import { Value } from '@sinclair/typebox/value';

export * from './CommentGetter';
export { CommentGetter };

export interface CnbConfig {
	id: string;
	secret: string;
}

export default class CnbApi {
	static readonly baseHeader = { 'content-type': 'application/x-www-form-urlencoded' };
	protected readonly requesterPromise: Promise<Requester>;
	constructor(
		protected readonly operator: Operator,
		protected readonly config: CnbConfig,
	) {
		const requester = new operator.requesterIniter(CnbApi.baseHeader);
		this.requesterPromise = this.login(requester);
	}

	protected async login(requester: Requester) {
		const body = await safeRequest(requester.send({
			method: Method.POST,
			url: 'https://api.cnblogs.com/token',
			data: {
				client_id: this.config.id,
				client_secret: this.config.secret,
				grant_type: 'client_credentials',
			},
		}));
		Value.Assert(Type.Object({ access_token: Type.String() }), body);
		requester.baseHeader.authorization = `Bearer ${body.access_token}`;
		return requester;
	}

	async getPost(postId: number) {
		const requester = await this.requesterPromise;
		const body = await safeRequest(requester.send({
			method: Method.GET,
			url: `https://api.cnblogs.com/api/blogposts/${postId}/body`,
		}));
		Value.Assert(Type.String(), body);
		return body;
	}

	getCommentGetter(blogApp: string, postId: number, pageSize?: number) {
		return new CommentGetter(this.requesterPromise, blogApp, postId, pageSize);
	}
}
