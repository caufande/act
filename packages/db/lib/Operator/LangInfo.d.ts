/**
 * 语言解析器
 * @license GPL-2.0-or-later
 */
declare module './LangInfo';
import { LangCode } from '../lang';
export default class LangInfo {
    readonly code: LangCode;
    constructor(langKey: string, info?: string);
}
