/**
 * 实用工具
 * @license AGPL-3.0-or-later
 */
declare module './util';

import libDeepEqual from 'deep-equal';
import { HTMLToJSON } from 'html-to-json-parser';
import { JSONContent } from 'html-to-json-parser/dist/types';

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
	arr[1]--;
	return new Date(...arr);
}

export async function postHtmlToJson(postHtml: string) {
	const html = removeBlankBetweenAttr(`<div>${postHtml}</div>`);
	return await HTMLToJSON(html) as JSONContent;
}

export function deepEqual(a: unknown, b: unknown) {
	return libDeepEqual(a, b, { strict: true });
}

export function getHolder<T>() {
	let res: (n: T) => void = () => { throw Error(); };
	const promise = new Promise<T>(r => res = r);
	return { promise, res };
}

export const NetDebounce = <R, P extends any[], N = unknown>(
	comparator: (args: P, argsCached: P) => boolean = (args, argsCached) => deepEqual(args, argsCached),
) => {
	return (target: (this: N, ...args: P) => Promise<R>): typeof target => {
		const caches = new Set<readonly [P, Promise<R>]>();
		return function (...args: P) {
			for (const [argsCached, cache] of caches) {
				if (comparator(args, argsCached)) return cache;
			}
			const { res, promise } = getHolder<R>();
			const id = [args, promise] as const;
			caches.add(id);
			return target.apply(this, args).then(r => {
				caches.delete(id);
				res(r);
				return r;
			});
		};
	};
};
