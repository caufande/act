declare module 'xmlrpc-parser' {
	export class XmlRpcMessage {
		constructor(methodname: string, params: readonly any[]);
		xml(): string;
	}
}
