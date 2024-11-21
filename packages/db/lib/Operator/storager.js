import { throwError } from '../errors';
export var CheckingType;
(function (CheckingType) {
    CheckingType[CheckingType["Both"] = 0] = "Both";
    CheckingType[CheckingType["Save"] = 1] = "Save";
    CheckingType[CheckingType["Load"] = 2] = "Load";
    CheckingType[CheckingType["None"] = 3] = "None";
})(CheckingType || (CheckingType = {}));
export class Storager {
    asserter;
    assert(n) {
        const f = this.asserter ?? throwError('NoAsserter', { checkingType: this.checkingType });
        f(n);
    }
    checkingType;
    serializer;
    deserializer;
    constructor({ checkingType = CheckingType.None, asserter, serializer, deserializer, } = {}) {
        this.checkingType = checkingType;
        this.asserter = asserter;
        this.serializer = serializer;
        this.deserializer = deserializer;
    }
    isSetCheck() {
        return this.checkingType === CheckingType.Both || this.checkingType === CheckingType.Save;
    }
    isGetCheck() {
        return this.checkingType === CheckingType.Both || this.checkingType === CheckingType.Load;
    }
    async get(key) {
        const data = await this.getOrigin(key);
        if (!data)
            return null;
        const deserialized = this.deserializer?.(data) ?? data;
        if (this.isGetCheck())
            this.assert(deserialized);
        return deserialized;
    }
    set(key, value) {
        if (this.isSetCheck())
            this.assert(value);
        const serialized = this.serializer?.(value) ?? value;
        return this.setOrigin(key, serialized);
    }
    async batchGet(keys) {
        const cause = await this.batchGetOrigin(keys);
        if (!Array.isArray(cause))
            throw Error('Isn\'t a Array!', { cause });
        const deserialized = this.deserializer ? cause.map(n => (n ? this.deserializer(n) : null)) : cause;
        if (this.isGetCheck())
            for (const data of deserialized) {
                if (data !== null)
                    this.assert(data);
            }
        return deserialized;
    }
    batchSet(kvs) {
        if (this.isSetCheck())
            for (const [_, value] of kvs) {
                this.assert(value);
            }
        const serialized = new Map(kvs.entries().map(([k, v]) => [k, this.serializer?.(v) ?? v]));
        return this.batchSetOrigin(serialized);
    }
}
