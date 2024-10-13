/**
 * 一些使用工具函数
 * @license GPL-2.0-or-later
 */
declare module './util';

import { RequestedData } from '../Operator';

export async function safeRequest(resultPromise: Promise<RequestedData>) {
	const { ok, error, code, data, header } = await resultPromise;
	if (!ok) throw [error, code, header];
	return data;
}

export function calcWhichPage(floor: number, total: number, pageSize: number) {
	const over = total % pageSize;
	const pageIndex = (total - over) / pageSize - Math.ceil((floor - over) / pageSize) + 1;
	const eleIndex = pageSize - (floor - 1 - over + pageSize) % pageSize - 1;
	return { pageIndex, eleIndex };
}

export function calcPageNum(total: number, pageSize: number) {
	return Math.ceil(total / pageSize);
}
