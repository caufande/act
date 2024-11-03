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

/**
 * 得到一个用于测试类型检查的宏生成器
 * @param f 类型检查函数
 */
export function gtc<T>(f: (n: unknown) => n is T) {
	/**
	 * @param i 信息
	 * @param e 要检查的东西
	 * @param b 是否应该通过检查
	 */
	return <S extends boolean>(i: string, e: S extends true ? T : any, b: S) => {
		return (t: test.Test) => {
			t[b ? 'ok' : 'notok'](f(e), i);
		};
	};
}
