/**
 * 语言相关
 * @license AGPL-3.0-or-later
 */
declare module './lang';
export declare enum Lang {
    zh = 0,
    'zh-CN' = 0,
    en = 1,
    'en-US' = 1
}
export type LangCode = Lang | '*';
export type LangMap = Partial<Record<Lang, string>> & {
    '*': Lang;
};
export declare function l10n(langMap: LangMap, langCode: LangCode): string;
