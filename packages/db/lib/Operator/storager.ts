/**
 * 缓存器定义
 * @license GPL-2.0-or-later
 */
declare module './storager';

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
	protected abstract getOrigin(key: string): Promise<unknown>;
	async get(key: string): Promise<T | null> {
		const data = await this.getOrigin(key);
		if (!data) return null;
		const deserialized = this.deserializer(data);
		this.assert(deserialized);
		return deserialized;
	}
	abstract set(key: string, value: T): Promise<boolean>;
	protected abstract batchGetOrigin(keys: readonly string[]): Promise<unknown>;
	async batchGet(keys: readonly string[]): Promise<(T | null)[]> {
		const cause = await this.batchGetOrigin(keys);
		if (!Array.isArray(cause)) throw Error('Isn\'t a Array!', { cause });
		const deserialized = cause.map(n => (n ? this.deserializer(n) : null));
		for (const data of deserialized) {
			if (data !== null) this.assert(data);
		}
		return deserialized;
	}
	abstract batchSet(kvs: Map<string, T>): Promise<boolean>;
}
