/**
 * 实用工具
 * @license GPL-2.0-or-later
 */
declare module './util';

export function range(from: number, to: number) {
	return Array(to - from).fill(from)
		.map((a, b) => a + b);
}

export function lowerFirst(str: string) {
	return str.charAt(0).toLowerCase() + str.slice(1);
}

export function removeBlankBetweenAttr(str: string) {
	return str.replace(/(?<=>)\s+(?=<)/g, '');
}

export function textToDate(text: string) {
	const arr = text.split('/').map(n => parseInt(n)) as [number, number, number];
	arr[1]++;
	return new Date(...arr);
}
