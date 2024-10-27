/**
 * 操作器定义
 * @license AGPL-3.0-or-later
 */
declare module '.';

import { l10n, LangMap } from '../lang';
import LangInfo from './LangInfo';
import { RequesterIniter } from './requester';
import { StoragerIniter } from './storager';

export * from './register';
export * from './requester';
export * from './storager';
export { LangInfo };

export default abstract class Operator {
	abstract readonly langInfo: LangInfo;
	abstract readonly requesterIniter: RequesterIniter;
	abstract readonly storagerIniter: StoragerIniter;
	l10n(langMap: LangMap) {
		return l10n(langMap, this.langInfo.code);
	}
}
