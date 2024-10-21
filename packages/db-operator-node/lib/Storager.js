import { Storager as IStorager } from '@cauact/db';
export default class Storager extends IStorager {
    async batchGetOrigin(keys) {
        return keys.map(_ => null);
    }
    async getOrigin(key) {
        return null;
    }
    async set(key, value) {
        return false;
    }
    async batchSet(kvs) {
        return false;
    }
    async clear() {
        1 + 1;
    }
    async delete(key) {
        1 + 1;
    }
}
