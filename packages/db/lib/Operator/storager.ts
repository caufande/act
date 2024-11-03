/**
 * 缓存器定义
 * @license AGPL-3.0-or-later
 */
declare module './storager';

export type StoragerIniter = new<T>(option?: StoragerOption<T>) => Storager<T>;

const defaultFn = (n: any) => n;

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
	checkingType: CheckingType;
	protected readonly assert: Asserter<T>;
	protected readonly serializer: Serializer<T>;
	protected readonly deserializer: Deserializer<T>;
	constructor({
		checkingType = CheckingType.None,
		asserter = () => true,
		serializer = defaultFn,
		deserializer = defaultFn,
	}: StoragerOption<T> = {}) {
		this.checkingType = checkingType;
		this.assert = asserter;
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
		const deserialized = this.deserializer(data);
		if (this.isGetCheck()) this.assert(deserialized);
		return deserialized;
	}

	protected abstract setOrigin(key: string, value: T): Promise<boolean>;
	set(key: string, value: T): Promise<boolean> {
		if (this.isSetCheck()) this.assert(value);
		const serialized = this.serializer(value);
		return this.setOrigin(key, serialized);
	}

	protected abstract batchGetOrigin(keys: readonly string[]): Promise<unknown>;
	async batchGet(keys: readonly string[]): Promise<(T | null)[]> {
		const cause = await this.batchGetOrigin(keys);
		if (!Array.isArray(cause)) throw Error('Isn\'t a Array!', { cause });
		const deserialized = cause.map(n => (n ? this.deserializer(n) : null));
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
		const serialized = new Map(kvs.entries().map(([k, v]) => [k, this.serializer(v)]));
		return this.batchSetOrigin(serialized);
	}
}
