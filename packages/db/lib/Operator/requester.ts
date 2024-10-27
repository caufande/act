/**
 * 请求器定义
 * @license AGPL-3.0-or-later
 */
declare module './requester';

import { TSchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import type { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';

export type { IncomingHttpHeaders } from 'http';

export type RequesterIniter = new (
	baseHeader?: IncomingHttpHeaders,
) => Requester;

export const enum Method {
	OPTIONS = 'OPTIONS',
	GET = 'GET',
	HEAD = 'HEAD',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
	TRACE = 'TRACE',
	CONNECT = 'CONNECT',
}

export interface RequestParams<T> {
	url: string;
	header?: IncomingHttpHeaders;
	data?: T;
	method?: Method;
}

export interface RequestedData {
	ok: boolean;
	error?: Error;
	data: any;
	code: number;
	header: OutgoingHttpHeaders;
}

export abstract class Requester {
	abstract baseHeader: IncomingHttpHeaders;
	abstract send<T>(params: RequestParams<T>): Promise<RequestedData>;
	async easyRequest<T, R extends TSchema>(params: RequestParams<T>, schema: R) {
		const { ok, error, code, data, header } = await this.send(params);
		if (!ok) throw [error, code, header];
		Value.Assert(schema, data);
		return data;
	}
}
