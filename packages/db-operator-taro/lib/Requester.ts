/**
 * 请求器定义
 * @license GPL-2.0-or-later
 */
declare module './Requester';

import {
	Requester as IRequester,
	IncomingHttpHeaders,
	Method,
	RequestParams,
	RequestedData,
	RequesterIniter,
} from '@cauact/db';
import { request } from '@tarojs/taro';

export default class Requester extends IRequester {
	baseHeader: IncomingHttpHeaders;
	constructor(...[baseHeader]: ConstructorParameters<RequesterIniter>) {
		super();
		this.baseHeader = baseHeader ?? {};
	}

	async send<T = undefined>({ url, header = {}, method = Method.GET, data }: RequestParams<T>): Promise<RequestedData> {
		const { data: gotData, errMsg, header: gotHeader, statusCode } = await request({
			header: { ...this.baseHeader, ...header },
			url,
			method,
			data,
		});
		const ok = errMsg.toString().includes('ok');
		let error;
		if (!ok) error = Error(errMsg);
		return {
			ok,
			code: statusCode,
			data: gotData,
			header: gotHeader,
			error,
		};
	}
}
