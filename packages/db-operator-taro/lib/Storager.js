import { Storager as IStorager } from '@cauact/db';
import { batchGetStorage, batchSetStorage, clearStorage, getStorage, removeStorage, setStorage, } from '@tarojs/taro';
export default class Storager extends IStorager {
    async batchGetOrigin(keys) {
        const res = await batchGetStorage({ keyList: keys.slice() });
        if (!('dataList' in res))
            throw Error();
        const { dataList } = res;
        return dataList;
    }
    async getOrigin(key) {
        let data;
        try {
            const { data } = await getStorage({ key });
            return data;
        }
        catch {
            return null;
        }
    }
    async setOrigin(key, value) {
        const res = await setStorage({ key, data: value });
        return res.errMsg.includes('ok');
    }
    async batchSetOrigin(kvs) {
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
