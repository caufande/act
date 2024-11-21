import { Storager as IStorager } from '@cauact/db';
export default class Storager extends IStorager {
    static storages = new Map();
    async batchGetOrigin(keys) {
        return keys.map(k => storages.get(k) ?? null);
    }
    async getOrigin(key) {
        return storages.get(key) ?? null;
    }
    async setOrigin(key, value) {
        return storages.set(key, value), true;
    }
    async batchSetOrigin(kvs) {
        return kvs.forEach((v, k) => storages.set(k, v)), true;
    }
    async clear() {
        storages.clear();
    }
    async delete(key) {
        storages.delete(key);
    }
}
const storages = Storager.storages;
