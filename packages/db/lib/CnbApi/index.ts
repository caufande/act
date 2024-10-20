/**
 * 博客 API 相关
 * @license GPL-2.0-or-later
 */
/// <reference path="../../types/xmlrpc-parser.d.ts" />
declare module '.';

import { Type } from '@sinclair/typebox';
import { XmlRpcMessage } from 'xmlrpc-parser';
import { throwError } from '../errors';
import { getOperator, IncomingHttpHeaders, Method, Requester } from '../Operator';
import CommentGetter from './CommentGetter';

export * from './CommentGetter';
export { CommentGetter };

export interface CnbConfig {
	id: string;
	secret: string;
	user?: string;
	password?: string;
}

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

	readonly requester: Requester;
	constructor(
		protected readonly config: CnbConfig,
	) {
		this.requester = new (getOperator().requesterIniter)();
	}

	static readonly baseApiHeader: IncomingHttpHeaders = {
		'content-type': 'application/x-www-form-urlencoded',
	};
	async getApiHeader(header: IncomingHttpHeaders = {}): Promise<IncomingHttpHeaders> {
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
		const body = await this.requester.easyRequest(
			{
				method: Method.POST,
				url: 'https://api.cnblogs.com/token',
				data: {
					client_id: this.config.id,
					client_secret: this.config.secret,
					grant_type: 'client_credentials',
				},
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

	getCommentGetter(blogApp: string, postId: number, pageSize?: number) {
		return new CommentGetter(this, blogApp, postId, pageSize);
	}

	static readonly baseXmlHeader: IncomingHttpHeaders = {
		'content-type': 'text/xml',
	};
	getXmlHeader(n: IncomingHttpHeaders = {}) {
		return {
			...CnbApi.baseXmlHeader,
			...n,
		};
	}

	protected xml(methodName: string, params: readonly any[]) {
		return new XmlRpcMessage(methodName, params).xml();
	}

	async editPost(post: Post, postId: number, blogApp: string, publish = true) {
		const user = this.config.user ?? throwError('NoUser', { postId, blogApp });
		const password = this.config.password ?? '';
		const xml = this.xml('metaWeblog.editPost', [postId, user, password, post, publish]);
		await this.requester.easyRequest(
			{
				method: Method.POST,
				url: `https://rpc.cnblogs.com/metaweblog/${blogApp}`,
				data: xml,
				header: { 'content-type': 'text/xml' },
			},
			CnbApi.XmlSuccess,
		);
		return true;
	}
}
