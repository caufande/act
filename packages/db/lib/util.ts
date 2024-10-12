/**
 * 一些使用工具函数
 */
declare module './util';

import { RequestedData } from './Requester';

export async function safeRequest(resultPromise: Promise<RequestedData>) {
	const { ok, error, code, data, header } = await resultPromise;
	if (!ok) throw [error, code, header];
	return data;
}
