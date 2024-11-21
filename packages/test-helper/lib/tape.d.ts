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
export declare function ta(n: string, c: ((t: test.Test) => void)[]): void;
/**
 * 得到一个用于测试类型检查的宏生成器
 * @param f 类型检查函数
 */
export declare function gtc<T>(f: (n: unknown) => n is T): <S extends boolean>(i: string, e: S extends true ? T : any, b: S) => (t: test.Test) => void;
