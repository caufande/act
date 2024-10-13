/**
 * 缓存器定义
 * @license GPL-2.0-or-later
 */
declare module './storager';

export type StoragerIniter = new<T>() => Storager<T>;

export abstract class Storager<T> {
	abstract clear(): Promise<void>;
	abstract delete(key: string): Promise<void>;
	abstract get(key: string): Promise<T | null>;
	abstract set(key: string, value: T): Promise<boolean>;
	abstract batchGet(keys: readonly string[]): Promise<(T | null)[]>;
	abstract batchSet(kvs: Map<string, T>): Promise<boolean>;
}
