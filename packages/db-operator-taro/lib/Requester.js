import { Requester as IRequester, } from '@cauact/db';
import { request } from '@tarojs/taro';
export default class Requester extends IRequester {
    baseHeader;
    constructor(...[baseHeader]) {
        super();
        this.baseHeader = baseHeader ?? {};
    }
    async send({ url, header = {}, method = "GET" /* Method.GET */, data }) {
        const { data: gotData, errMsg, header: gotHeader, statusCode } = await request({
            header: { ...this.baseHeader, ...header },
            url,
            method,
            data,
        });
        const ok = errMsg.toString().includes('ok');
        let error;
        if (!ok)
            error = Error(errMsg);
        return {
            ok,
            code: statusCode,
            data: gotData,
            header: gotHeader,
            error,
        };
    }
}
