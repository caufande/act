/**
 * 语言相关
 * @license AGPL-3.0-or-later
 */
declare module './lang';

export enum Lang {
	zh,
	'zh-CN' = Lang.zh,
	en,
	'en-US' = Lang.en,
}

export type LangCode = Lang | '*';

export type LangMap = Partial<Record<Lang, string>> & { '*': Lang };

export function l10n(langMap: LangMap, langCode: LangCode) {
	if (langCode === '*') return langMap[langMap['*']]!;
	return langMap[langCode] ?? langMap[langMap['*']]!;
}
