import { Requester as IRequester, } from '@cauact/db';
import needle from 'needle';
export default class Requester extends IRequester {
    baseHeader;
    constructor(...[baseHeader]) {
        super();
        this.baseHeader = baseHeader ?? {};
    }
    async send({ url, header = {}, method: methodIn = "GET" /* Method.GET */, data }) {
        const method = methodIn.toLowerCase();
        const res = await needle(method, url, data ?? null, {
            headers: { ...this.baseHeader, ...header },
        });
        const error = res.errored ? Error(res.statusMessage) : void 0;
        return {
            ok: !res.errored,
            code: res.statusCode ?? 0,
            data: res.body,
            header: res.headers,
            error,
        };
    }
}
