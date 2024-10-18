/**
 * 请求器定义
 * @license GPL-2.0-or-later
 */
declare module './Requester';
import { Requester as IRequester, IncomingHttpHeaders, RequestParams, RequestedData, RequesterIniter } from '@cauact/db/lib/Operator';
export default class Requester extends IRequester {
    baseHeader: IncomingHttpHeaders;
    constructor(...[baseHeader]: ConstructorParameters<RequesterIniter>);
    send<T = undefined>({ url, header, method, data }: RequestParams<T>): Promise<RequestedData>;
}
