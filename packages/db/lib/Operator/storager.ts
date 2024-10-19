/**
 * 缓存器定义
 * @license GPL-2.0-or-later
 */
declare module './storager';

import { Static, TSchema } from '@sinclair/typebox';

export type StoragerIniter = new<S extends TSchema>(schema: S) => Storager<S>;

export abstract class Storager<S extends TSchema> {
	constructor(
		protected readonly schema: S,
	) {	}
	abstract clear(): Promise<void>;
	abstract delete(key: string): Promise<void>;
	abstract get(key: string): Promise<Static<S> | null>;
	abstract set(key: string, value: Static<S>): Promise<boolean>;
	abstract batchGet(keys: readonly string[]): Promise<(Static<S> | null)[]>;
	abstract batchSet(kvs: Map<string, Static<S>>): Promise<boolean>;
}
