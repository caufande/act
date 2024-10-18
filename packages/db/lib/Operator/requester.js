import { Value } from '@sinclair/typebox/value';
export class Requester {
    async easyRequest(params, schema) {
        const { ok, error, code, data, header } = await this.send(params);
        if (!ok)
            throw [error, code, header];
        Value.Assert(schema, data);
        return data;
    }
}
