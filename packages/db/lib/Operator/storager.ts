/**
 * 缓存器定义
 * @license GPL-2.0-or-later
 */
declare module './storager';

import { Static, TSchema } from '@sinclair/typebox';

export type Asserter<T> = (n: unknown) => asserts n is T;
export type Deserializer<T> = (n: any) => T;
export type StoragerIniter = new<T>(asserter: Asserter<T>, deserializer?: Deserializer<T>) => Storager<T>;
const defaultDeserializer: Deserializer<any> = n => n;

export abstract class Storager<T> {
	constructor(
		protected readonly assert: Asserter<T>,
		protected readonly deserializer: Deserializer<T> = defaultDeserializer,
	) {	}
	abstract clear(): Promise<void>;
	abstract delete(key: string): Promise<void>;
	abstract get(key: string): Promise<T | null>;
	abstract set(key: string, value: T): Promise<boolean>;
	abstract batchGet(keys: readonly string[]): Promise<(T | null)[]>;
	abstract batchSet(kvs: Map<string, T>): Promise<boolean>;
}
