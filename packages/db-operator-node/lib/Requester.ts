/**
 * 请求器定义
 * @license AGPL-3.0-or-later
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
import needle from 'needle';

export default class Requester extends IRequester {
	static getIniter(debug: boolean) {
		if (!debug) return Requester;
		return class RequesterDebug extends Requester {
			protected override debug = true;
		};
	}

	protected debug = false;
	baseHeader: IncomingHttpHeaders;
	constructor(...[baseHeader]: ConstructorParameters<RequesterIniter>) {
		super();
		this.baseHeader = baseHeader ?? {};
	}

	async send<T = undefined>({ url, header = {}, method: methodIn = Method.GET, data }: RequestParams<T>): Promise<RequestedData> {
		const method: any = (methodIn as string).toLowerCase();
		const headers = { ...this.baseHeader, ...header };
		if (this.debug) console.log({ method, url, data, headers });
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
