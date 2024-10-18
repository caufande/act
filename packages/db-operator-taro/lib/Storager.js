import { Storager as IStorager } from '@cauact/db/lib/Operator';
import { getStorage, setStorage, batchGetStorage, batchSetStorage, clearStorage, removeStorage, } from '@tarojs/taro';
export default class Storager extends IStorager {
    async batchGet(keys) {
        const res = await batchGetStorage({ keyList: keys.slice() });
        // @ts-ignore
        return res.dataList;
    }
    async get(key) {
        try {
            const res = await getStorage({ key });
            return res.data;
        }
        catch {
            return null;
        }
    }
    async set(key, value) {
        const res = await setStorage({ key, data: value });
        return res.errMsg.includes('ok');
    }
    async batchSet(kvs) {
        const kvList = [];
        kvs.forEach((value, key) => kvList.push({ value, key }));
        const res = await batchSetStorage({ kvList });
        return res.errMsg.includes('ok');
    }
    async clear() {
        await clearStorage();
    }
    async delete(key) {
        await removeStorage({ key });
    }
}
