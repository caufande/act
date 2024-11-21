import { Requester as IRequester, } from '@cauact/db';
import needle from 'needle';
export default class Requester extends IRequester {
    static getIniter(debug) {
        if (!debug)
            return Requester;
        return class RequesterDebug extends Requester {
            debug = true;
        };
    }
    debug = false;
    baseHeader;
    constructor(...[baseHeader]) {
        super();
        this.baseHeader = baseHeader ?? {};
    }
    async send({ url, header = {}, method: methodIn = "GET" /* Method.GET */, data }) {
        const method = methodIn.toLowerCase();
        const headers = { ...this.baseHeader, ...header };
        if (this.debug)
            console.log({ method, url, data, headers });
        const res = await needle(method, url, data ?? null, {
            headers,
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
