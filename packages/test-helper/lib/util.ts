/**
 * 一些方便的小工具
 * @license AGPL-3.0-or-later
 */
declare module './util';

/**
 * 轻松得到多行文本
 * @param args 文本的每一行
 * @returns 多行文本
 */
export function m(...args: string[]) {
	return args.join('\n');
}
