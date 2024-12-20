/**
 * 一些使用工具函数
 * @license AGPL-3.0-or-later
 */
declare module './util';

export function calcWhichPage(floor: number, total: number, pageSize: number) {
	const over = total % pageSize;
	const pageIndex = (total - over) / pageSize - Math.ceil((floor - over) / pageSize) + 1;
	const eleIndex = pageSize - (floor - 1 - over + pageSize) % pageSize - 1;
	return { pageIndex, eleIndex };
}

export function calcPageNum(total: number, pageSize: number) {
	return Math.ceil(total / pageSize);
}
