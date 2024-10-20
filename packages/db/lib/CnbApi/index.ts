/**
 * 博客 API 相关
 * @license GPL-2.0-or-later
 */
/// <reference path="../../types/xmlrpc-parser.d.ts" />
declare module '.';

import { Static, Type } from '@sinclair/typebox';
import { XmlRpcMessage } from 'xmlrpc-parser';
import { throwError } from '../errors';
import { getOperator, IncomingHttpHeaders, Method, Requester } from '../Operator';
import CommentGetter from './CommentGetter';

export * from './CommentGetter';
export { CommentGetter };

export interface CnbConfig {
	id?: string;
	secret?: string;
	user?: string;
	password?: string;
	blogApp?: string;
}

const CommentOrigin = Type.Object({
	Id: Type.Number(),
	Body: Type.String(),
	Author: Type.String(),
	AuthorUrl: Type.String(),
	FaceUrl: Type.Union([Type.String(), Type.Null()]),
	Floor: Type.Number(),
	DateAdded: Type.String(),
});
export type CommentOrigin = Static<typeof CommentOrigin>;

export namespace Post {
	export interface Enclosure {
		length?: number;
		type?: string;
		url?: string;
	}
	export interface Source {
		name?: string;
		url?: string;
	}
}
export interface Post {
	description: string;
	title: string;
	dateCreated?: Date;
	categories?: readonly string[];
	enclosure?: Post.Enclosure;
	link?: string;
	permalink?: string;
	postid?: number;
	source?: Post.Source;
	userid?: string;
	mt_allow_comments?: any;
	mt_allow_pings?: any;
	mt_convert_breaks?: any;
	mt_text_mote?: string;
	mt_excerpt?: string;
	mt_keywords?: string;
	wp_slug?: string;
}

interface LoginData {
	client_id: string;
	client_secret: string;
	grant_type: 'client_credentials';
}

export default class CnbApi {
	protected static readonly XmlSuccess = Type.Object({
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

	protected readonly requester: Requester;
	constructor(
		public config: CnbConfig,
	) {
		this.requester = new (getOperator().requesterIniter)();
	}

	static readonly baseApiHeader: IncomingHttpHeaders = {
		'content-type': 'application/x-www-form-urlencoded',
	};
	protected async getApiHeader(header: IncomingHttpHeaders = {}): Promise<IncomingHttpHeaders> {
		return {
			...CnbApi.baseApiHeader,
			authorization: await this.login(),
			...header,
		};
	}

	private expiresDate: Date | null = null;
	private authorizationStr = '';
	protected async login() {
		if (this.expiresDate && new Date() < this.expiresDate) return this.authorizationStr;
		const data: LoginData = {
			client_id: this.config.id ?? throwError('NoClientId', { cnbConfig: this.config }),
			client_secret: this.config.secret ?? throwError('NoClientSecret', { cnbConfig: this.config }),
			grant_type: 'client_credentials',
		};
		const body = await this.requester.easyRequest(
			{
				method: Method.POST,
				url: 'https://api.cnblogs.com/token',
				data,
				header: CnbApi.baseApiHeader,
			},
			Type.Object({
				access_token: Type.String(),
				expires_in: Type.Number(),
			}),
		);
		this.expiresDate = new Date(body.expires_in);
		return this.authorizationStr = `Bearer ${body.access_token}`;
	}

	async getPost(postId: number) {
		const body = await this.requester.easyRequest(
			{
				method: Method.GET,
				url: `https://api.cnblogs.com/api/blogposts/${postId}/body`,
				header: await this.getApiHeader(),
			},
			Type.String(),
		);
		return body;
	}

	async getCommentPage(postId: number, index: number, pageSize: number): Promise<CommentOrigin[]> {
		const data = await this.requester.easyRequest(
			{
				method: Method.GET,
				url: `https://api.cnblogs.com/api/blogs/${this.config.blogApp}/posts/${postId}/comments?pageIndex=${index}&pageSize=${pageSize}`,
				header: await this.getApiHeader(),
			},
			Type.Array(CommentOrigin),
		);
		return data;
	}

	getCommentGetter(postId: number, pageSize?: number) {
		return new CommentGetter(this, postId, pageSize);
	}

	static readonly baseXmlHeader: IncomingHttpHeaders = {
		'content-type': 'text/xml',
	};
	protected getXmlHeader(n: IncomingHttpHeaders = {}) {
		return {
			...CnbApi.baseXmlHeader,
			...n,
		};
	}

	protected xml(methodName: string, params: readonly any[]) {
		return new XmlRpcMessage(methodName, params).xml();
	}

	async editPost(postId: number, post: Post, publish = true) {
		const user = this.config.user ?? throwError('NoUser', { cnbConfig: this.config });
		const password = this.config.password ?? throwError('NoPassword', { cnbConfig: this.config });
		const xml = this.xml('metaWeblog.editPost', [postId, user, password, post, publish]);
		await this.requester.easyRequest(
			{
				method: Method.POST,
				url: `https://rpc.cnblogs.com/metaweblog/${this.config.blogApp}`,
				data: xml,
				header: { 'content-type': 'text/xml' },
			},
			CnbApi.XmlSuccess,
		);
		return true;
	}
}
