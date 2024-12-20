/**
 * 缓存器定义
 * @license AGPL-3.0-or-later
 */
declare module './Storager';

import { Storager as IStorager } from '@cauact/db';
import {
	batchGetStorage,
	batchSetStorage,
	clearStorage,
	getStorage,
	removeStorage,
	setStorage,
} from '@tarojs/taro';

export default class Storager<T> extends IStorager<T> {
	protected async batchGetOrigin(keys: readonly string[]): Promise<unknown> {
		const res = await batchGetStorage({ keyList: keys.slice() });
		if (!('dataList' in res)) throw Error();
		const { dataList } = res;
		return dataList;
	}
	protected async getOrigin(key: string): Promise<T | null> {
		let data;
		try {
			const { data } = await getStorage({ key });
			return data;
		} catch {
			return null;
		}
	}
	async setOrigin(key: string, value: T): Promise<boolean> {
		const res = await setStorage({ key, data: value });
		return res.errMsg.includes('ok');
	}
	async batchSetOrigin(kvs: Map<string, T>): Promise<boolean> {
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
