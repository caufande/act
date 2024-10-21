const defaultDeserializer = n => n;
export class Storager {
    assert;
    deserializer;
    constructor(assert, deserializer = defaultDeserializer) {
        this.assert = assert;
        this.deserializer = deserializer;
    }
    async get(key) {
        const data = await this.getOrigin(key);
        if (!data)
            return null;
        const deserialized = this.deserializer(data);
        this.assert(deserialized);
        return deserialized;
    }
    async batchGet(keys) {
        const cause = await this.batchGetOrigin(keys);
        if (!Array.isArray(cause))
            throw Error('Isn\'t a Array!', { cause });
        const deserialized = cause.map(n => (n ? this.deserializer(n) : null));
        for (const data of deserialized) {
            if (data !== null)
                this.assert(data);
        }
        return deserialized;
    }
}
