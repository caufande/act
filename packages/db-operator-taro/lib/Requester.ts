/**
 * 请求器定义
 * @license GPL-2.0-or-later
 */
declare module './Requester';

import type IRequester from '@cauact/db/lib/Requester';
import { Method, RequesterIniter, type Config, type Data, type IncomingHttpHeaders } from '@cauact/db/lib/Requester';
import { request } from '@tarojs/taro';

export default class Requester implements IRequester {
	baseHeader: IncomingHttpHeaders;
	constructor(...[baseHeader]: ConstructorParameters<RequesterIniter>) {
		this.baseHeader = baseHeader;
	}

	async send<T = undefined>({ url, header = {}, method = Method.GET, data }: Config<T>): Promise<Data> {
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
			body: gotData.toString(),
			header: gotHeader,
			error,
		};
	}
}
