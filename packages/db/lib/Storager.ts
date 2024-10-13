/**
 * 缓存器定义
 * @license GPL-2.0-or-later
 */
declare module './Storager';

export type StoragerIniter<T> = new () => Storager<T>;

export default abstract class Storager<T> {
	abstract clear(): Promise<void>;
	abstract delete(key: string): Promise<boolean>;
	abstract get(key: string): Promise<T | undefined>;
	abstract set(key: string, value: T): Promise<boolean>;
	abstract batchGet(keys: readonly string[]): Promise<T[]>;
	abstract batchSet(kvs: readonly { key: string; value: T }[]): Promise<boolean[]>;
}
