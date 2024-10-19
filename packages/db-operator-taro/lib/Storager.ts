/**
 * 缓存器定义
 * @license GPL-2.0-or-later
 */
declare module './Storager';

import { Storager as IStorager } from '@cauact/db/lib/Operator';
import {
	batchGetStorage,
	batchSetStorage,
	clearStorage,
	getStorage,
	removeStorage,
	setStorage,
} from '@tarojs/taro';

export default class Storager<T> extends IStorager<T> {
	async batchGet(keys: readonly string[]): Promise<(T | null)[]> {
		const res = await batchGetStorage({ keyList: keys.slice() });
		if (!('dataList' in res)) throw Error();
		const { dataList } = res;
		if (!Array.isArray(dataList)) throw Error();
		for (const data of dataList) {
			if (data !== null) this.assert(data);
		}
		return dataList;
	}
	async get(key: string): Promise<T | null> {
		try {
			const { data } = await getStorage({ key });
			this.assert(data);
			return data;
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
