import { l10n } from '../lang';
export * from './register';
export * from './requester';
export * from './storager';
export default class Operator {
    l10n(langMap) {
        return l10n(langMap, this.langInfo.code);
    }
}
