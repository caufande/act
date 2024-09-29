/**
 * 请求器定义
 * @license GPL-2.0-or-later
 */
declare module './Requester';
import type IRequester from '@cauact/db/lib/Requester';
import { RequesterIniter, type IncomingHttpHeaders, type RequestParams, type RequestedData } from '@cauact/db/lib/Requester';
export default class Requester implements IRequester {
    baseHeader: IncomingHttpHeaders;
    constructor(...[baseHeader]: ConstructorParameters<RequesterIniter>);
    send<T = undefined>({ url, header, method, data }: RequestParams<T>): Promise<RequestedData>;
}
