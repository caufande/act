import { Value } from '@sinclair/typebox/value';
import { NetDebounce } from '../util';
export class Requester {
    sendDebounced = NetDebounce()(this.send);
    async easyRequest(params, schema) {
        const { ok, error, code, data, header } = await this.sendDebounced(params);
        if (!ok)
            throw [error, code, header];
        Value.Assert(schema, data);
        return data;
    }
}
