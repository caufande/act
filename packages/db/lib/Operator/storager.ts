/**
 * 缓存器定义
 * @license AGPL-3.0-or-later
 */
declare module './storager';

import { throwError } from '../errors';

export type StoragerIniter = new<T>(option?: StoragerOption<T>) => Storager<T>;

export enum CheckingType {
	Both,
	Save,
	Load,
	None,
}
export type Asserter<T> = (n: unknown) => asserts n is T;
export type Serializer<T> = (n: T) => any;
export type Deserializer<T> = (n: any) => T;

export interface StoragerOption<T> {
	checkingType?: CheckingType;
	asserter?: Asserter<T>;
	serializer?: Serializer<T>;
	deserializer?: Deserializer<T>;
}

export abstract class Storager<T> {
	private readonly asserter?: Asserter<T>;
	protected assert(n: unknown): asserts n is T {
		const f: (n: unknown) => void = this.asserter ?? throwError('NoAsserter', { checkingType: this.checkingType });
		f(n);
	}

	checkingType: CheckingType;
	protected readonly serializer?: Serializer<T>;
	protected readonly deserializer?: Deserializer<T>;
	constructor({
		checkingType = CheckingType.None,
		asserter,
		serializer,
		deserializer,
	}: StoragerOption<T> = {}) {
		this.checkingType = checkingType;
		this.asserter = asserter;
		this.serializer = serializer;
		this.deserializer = deserializer;
	}

	private isSetCheck() {
		return this.checkingType === CheckingType.Both || this.checkingType === CheckingType.Save;
	}
	private isGetCheck() {
		return this.checkingType === CheckingType.Both || this.checkingType === CheckingType.Load;
	}

	abstract clear(): Promise<void>;
	abstract delete(key: string): Promise<void>;

	protected abstract getOrigin(key: string): Promise<unknown>;
	async get(key: string): Promise<T | null> {
		const data = await this.getOrigin(key);
		if (!data) return null;
		const deserialized = this.deserializer?.(data) ?? data as T;
		if (this.isGetCheck()) this.assert(deserialized);
		return deserialized;
	}

	protected abstract setOrigin(key: string, value: T): Promise<boolean>;
	set(key: string, value: T): Promise<boolean> {
		if (this.isSetCheck()) this.assert(value);
		const serialized = this.serializer?.(value) ?? value as T;
		return this.setOrigin(key, serialized);
	}

	protected abstract batchGetOrigin(keys: readonly string[]): Promise<unknown>;
	async batchGet(keys: readonly string[]): Promise<(T | null)[]> {
		const cause = await this.batchGetOrigin(keys);
		if (!Array.isArray(cause)) throw Error('Isn\'t a Array!', { cause });
		const deserialized = this.deserializer ? cause.map(n => (n ? this.deserializer!(n) : null)) : cause;
		if (this.isGetCheck()) for (const data of deserialized) {
			if (data !== null) this.assert(data);
		}
		return deserialized;
	}

	protected abstract batchSetOrigin(kvs: Map<string, T>): Promise<boolean>;
	batchSet(kvs: ReadonlyMap<string, T>): Promise<boolean> {
		if (this.isSetCheck()) for (const [_, value] of kvs) {
			this.assert(value);
		}
		const serialized = new Map(kvs.entries().map(([k, v]) => [k, this.serializer?.(v) ?? v]));
		return this.batchSetOrigin(serialized);
	}
}
