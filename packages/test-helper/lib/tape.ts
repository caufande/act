/**
 * Tape 相关的测试工具
 * @license AGPL-3.0-or-later
 */
declare module '.';

import test from 'tape';

/**
 * 批量运行测试宏
 * @param n 提示
 * @param c 测试宏数组
 */
export function ta(n: string, c: ((t: test.Test) => void)[]) {
	test(n, t => {
		c.forEach(f => f(t));
		t.end();
	});
}
