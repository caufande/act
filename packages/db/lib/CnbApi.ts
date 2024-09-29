/**
 * 博客 API 相关
 */
declare module './CnbApi';

import Requester, {	Method, RequesterIniter, RequestedData } from './Requester';

export interface CnbConfig {
	id: string;
	secret: string;
}
export default class CnbApi {
	static readonly baseHeader = { 'content-type': 'application/x-www-form-urlencoded' };
	private readonly requesterPromise: Promise<Requester>;
	constructor(
		requesterIniter: RequesterIniter,
		private readonly config: CnbConfig,
	) {
		const requester = new requesterIniter(CnbApi.baseHeader);
		this.requesterPromise = this.login(requester);
	}

	private async login(requester: Requester) {
		const body = await this.safeRequest(requester.send({
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

	private async safeRequest(resultPromise: Promise<RequestedData>) {
		const { ok, error, code, data, header } = await resultPromise;
		if (!ok) throw [error, code, header];
		return data;
	}

	async getPost(postId: number) {
		const requester = await this.requesterPromise;
		const body = await this.safeRequest(requester.send({
			method: Method.GET,
			url: `https://api.cnblogs.com/api/blogposts/${postId}/body`,
		}));
		return body as string;
	}
}
