import { Lang } from '../lang';
export default class LangInfo {
    code;
    constructor(langKey, info = '未知的语言/地区，请联系管理员') {
        if (langKey !== '*' && typeof Lang[langKey] !== 'number') {
            throw Error(info);
        }
        this.code = Lang[langKey] ?? '*';
    }
}
