import { l10n } from '../lang';
import LangInfo from './LangInfo';
export * from './register';
export * from './requester';
export * from './storager';
export { LangInfo };
export default class Operator {
    l10n(langMap) {
        return l10n(langMap, this.langInfo.code);
    }
}
