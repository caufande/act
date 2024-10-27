/**
 * 缓存器定义
 * @license AGPL-3.0-or-later
 */
declare module './Storager';

import { Storager as IStorager } from '@cauact/db';

export default class Storager<T> extends IStorager<T> {
	protected async batchGetOrigin(keys: readonly string[]): Promise<unknown> {
		return keys.map(_ => null);
	}
	protected async getOrigin(key: string): Promise<unknown> {
		return null;
	}
	async set(key: string, value: T): Promise<boolean> {
		return false;
	}
	async batchSet(kvs: Map<string, T>): Promise<boolean> {
		return false;
	}
	async clear(): Promise<void> {
		1 + 1;
	}
	async delete(key: string): Promise<void> {
		1 + 1;
	}
}
