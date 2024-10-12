/**
 * 博客 API 相关
 */
declare module '.';

import Requester, { Method, RequesterIniter } from '../Requester';
import { safeRequest } from '../util';
import CommitGetter from './CommitGetter';

export { CommitGetter };
export * from './CommitGetter';

export interface CnbConfig {
	id: string;
	secret: string;
}


export default class CnbApi {
	static readonly baseHeader = { 'content-type': 'application/x-www-form-urlencoded' };
	protected readonly requesterPromise: Promise<Requester>;
	constructor(
		requesterIniter: RequesterIniter,
		protected readonly config: CnbConfig,
	) {
		const requester = new requesterIniter(CnbApi.baseHeader);
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
		const token = body.access_token as string;
		requester.baseHeader.authorization = `Bearer ${token}`;
		return requester;
	}

	async getPost(postId: number) {
		const requester = await this.requesterPromise;
		const body = await safeRequest(requester.send({
			method: Method.GET,
			url: `https://api.cnblogs.com/api/blogposts/${postId}/body`,
		}));
		return body as string;
	}

	getCommitGetter(blogApp: string, postId: number, pageSize?: number) {
		return new CommitGetter(this.requesterPromise, blogApp, postId, pageSize);
	}
}
