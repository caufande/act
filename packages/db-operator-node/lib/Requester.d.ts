/**
 * 请求器定义
 * @license AGPL-3.0-or-later
 */
declare module './Requester';
import { Requester as IRequester, IncomingHttpHeaders, RequestParams, RequestedData, RequesterIniter } from '@cauact/db';
export default class Requester extends IRequester {
    static getIniter(debug: boolean): typeof Requester;
    protected debug: boolean;
    baseHeader: IncomingHttpHeaders;
    constructor(...[baseHeader]: ConstructorParameters<RequesterIniter>);
    send<T = undefined>({ url, header, method: methodIn, data }: RequestParams<T>): Promise<RequestedData>;
}
