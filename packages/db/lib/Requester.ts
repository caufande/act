/**
 * 请求器定义
 * @license GPL-2.0-or-later
 */
declare module './Requester';

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

export default abstract class Requester {
	abstract baseHeader: IncomingHttpHeaders;
	abstract send<T>(params: RequestParams<T>): Promise<RequestedData>;
}
