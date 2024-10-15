/**
 * 语言解析器
 * @license GPL-2.0-or-later
 */
declare module './LangInfo';

import { Lang } from '../lang';

export default class LangInfo {
	readonly code: Lang | '*';
	constructor(langKey: string, info = '未知的语言/地区，请联系管理员') {
		if (langKey !== '*' && typeof Lang[langKey as any] !== 'number') {
			throw Error(info);
		}
		this.code = Lang[langKey as any] as any ?? '*';
	}
}
