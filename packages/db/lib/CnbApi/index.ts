/**
 * 博客 API 相关
 * @license GPL-2.0-or-later
 */
/// <reference path="../../types/xmlrpc-parser.d.ts" />
declare module '.';

import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { XmlRpcMessage } from 'xmlrpc-parser';
import { throwError } from '../errors';
import { getOperator, Method, Requester } from '../Operator';
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
	static readonly baseHeader = { 'content-type': 'application/x-www-form-urlencoded' };
	protected readonly requesterPromise: Promise<Requester>;
	constructor(
		protected readonly config: CnbConfig,
	) {
		const requester = new (getOperator().requesterIniter)(CnbApi.baseHeader);
		this.requesterPromise = this.login(requester);
	}

	protected async login(requester: Requester) {
		const body = await requester.easyRequest(
			{
				method: Method.POST,
				url: 'https://api.cnblogs.com/token',
				data: {
					client_id: this.config.id,
					client_secret: this.config.secret,
					grant_type: 'client_credentials',
				},
			},
			Type.Object({ access_token: Type.String() }),
		);
		Value.Assert(Type.Object({ access_token: Type.String() }), body);
		requester.baseHeader.authorization = `Bearer ${body.access_token}`;
		return requester;
	}

	async getPost(postId: number) {
		const requester = await this.requesterPromise;
		const body = await requester.easyRequest(
			{
				method: Method.GET,
				url: `https://api.cnblogs.com/api/blogposts/${postId}/body`,
			},
			Type.String(),
		);
		return body;
	}

	getCommentGetter(blogApp: string, postId: number, pageSize?: number) {
		return new CommentGetter(this.requesterPromise, blogApp, postId, pageSize);
	}

	protected XmlSuccess = Type.Object({
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
	async editPost(post: Post, postId: number, blogApp: string, publish = true) {
		const user = this.config.user ?? throwError('NoUser', { postId, blogApp });
		const password = this.config.password ?? '';
		const xml = new XmlRpcMessage('metaWeblog.editPost', [postId, user, password, post, publish]).xml();
		const requester = await this.requesterPromise;
		const body = await requester.easyRequest(
			{
				method: Method.POST,
				url: `https://rpc.cnblogs.com/metaweblog/${blogApp}`,
				data: xml,
				header: { 'content-type': 'text/xml' },
			},
			this.XmlSuccess,
		);
		return true;
	}
}
