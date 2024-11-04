/**
 * 缓存器定义
 * @license AGPL-3.0-or-later
 */
declare module './Storager';

import { Storager as IStorager } from '@cauact/db';

export default class Storager<T> extends IStorager<T> {
	static readonly storages = new Map<string, any>();
	protected async batchGetOrigin(keys: readonly string[]): Promise<unknown> {
		return keys.map(k => storages.get(k) ?? null);
	}
	protected async getOrigin(key: string): Promise<unknown> {
		return storages.get(key) ?? null;
	}
	async setOrigin(key: string, value: T): Promise<boolean> {
		return storages.set(key, value), true;
	}
	async batchSetOrigin(kvs: Map<string, T>): Promise<boolean> {
		return kvs.forEach((v, k) => storages.set(k, v)), true;
	}
	async clear(): Promise<void> {
		storages.clear();
	}
	async delete(key: string): Promise<void> {
		storages.delete(key);
	}
}

const storages = Storager.storages;
