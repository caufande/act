/**
 * 缓存器定义
 * @license GPL-2.0-or-later
 */
declare module './Storager';

import IStorager from '@cauact/db/lib/Storager';
import {
	getStorage,
	setStorage,
	batchGetStorage,
	batchSetStorage,
	clearStorage,
	removeStorage,
} from '@tarojs/taro';

export default class Storager<T> extends IStorager<T> {
	async batchGet(keys: readonly string[]): Promise<(T | null)[]> {
		const res = await batchGetStorage({ keyList: keys.slice() });
		// @ts-ignore
		return res.dataList;
	}
	async get(key: string): Promise<T | null> {
		try {
			const res = await getStorage({ key });
			return res.data;
		} catch {
			return null;
		}
	}
	async set(key: string, value: T): Promise<boolean> {
		const res = await setStorage({ key, data: value });
		return res.errMsg.includes('ok');
	}
	async batchSet(kvs: Map<string, T>): Promise<boolean> {
		const kvList: { key: string; value: T }[] = [];
		kvs.forEach((value, key) => kvList.push({ value, key }));
		const res = await batchSetStorage({ kvList });
		return res.errMsg.includes('ok');
	}
	async clear(): Promise<void> {
		await clearStorage();
	}
	async delete(key: string): Promise<void> {
		await removeStorage({ key });
	}
}
