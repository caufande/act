/**
 * 语言解析器
 * @license AGPL-3.0-or-later
 */
declare module './LangInfo';

import { Lang, LangCode } from '../lang';

export default class LangInfo {
	readonly code: LangCode;
	constructor(langKey: string, info = '未知的语言/地区，请联系管理员') {
		if (langKey !== '*' && typeof Lang[langKey as any] !== 'number') {
			throw Error(info);
		}
		this.code = Lang[langKey as any] as any ?? '*';
	}
}
