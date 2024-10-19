/**
 * 缓存器定义
 * @license GPL-2.0-or-later
 */
declare module './Storager';

import { Storager as IStorager } from '@cauact/db/lib/Operator';
import { Static, TSchema, Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import {
	getStorage,
	setStorage,
	batchGetStorage,
	batchSetStorage,
	clearStorage,
	removeStorage,
} from '@tarojs/taro';

export default class Storager<S extends TSchema> extends IStorager<S> {
	async batchGet(keys: readonly string[]): Promise<(Static<S> | null)[]> {
		const res = await batchGetStorage({ keyList: keys.slice() });
		if (!('dataList' in res)) {
			throw Error('No `dataList` attr!');
		}
		const { dataList } = res;
		Value.Assert(Type.Array(Type.Union([Type.Null(), this.schema])), dataList);
		return dataList;
	}
	async get(key: string): Promise<Static<S> | null> {
		try {
			const { data } = await getStorage({ key });
			Value.Assert(this.schema, data);
			return data;
		} catch {
			return null;
		}
	}
	async set(key: string, value: Static<S>): Promise<boolean> {
		const res = await setStorage({ key, data: value });
		return res.errMsg.includes('ok');
	}
	async batchSet(kvs: Map<string, Static<S>>): Promise<boolean> {
		const kvList: { key: string; value: Static<S> }[] = [];
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
